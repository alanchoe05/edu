import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { auth } from '../lib/firebase'
import { getUserProfile } from '../services/userProfile'
import { getDashboardPath } from '../utils/roles'

const mapFirebaseError = (error: FirebaseError) => {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/user-disabled':
      return 'This account has been disabled. Contact an administrator.'
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password.'
    default:
      return 'We could not sign you in right now. Please try again later.'
  }
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { refreshProfile, profile } = useAuth()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password)
      const profile = await getUserProfile(credential.user.uid)

      if (!profile) {
        throw new Error('Profile data is missing. Please contact an administrator.')
      }

      await refreshProfile()
      navigate(getDashboardPath(profile.role), { replace: true })
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(mapFirebaseError(err))
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Unexpected error. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (profile) {
    return <Navigate to={getDashboardPath(profile.role)} replace />
  }

  return (
    <section className="mx-auto w-full max-w-lg">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Sign in</h1>
        <p className="mt-2 text-sm text-slate-600">
          Enter your email and password to jump straight to your role-based dashboard.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-slate-600 transition focus:border-slate-400 focus:ring-2"
            placeholder="student@example.com"
            autoComplete="email"
            required
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Password</span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-slate-600 transition focus:border-slate-400 focus:ring-2"
            placeholder="Your password"
            autoComplete="current-password"
            minLength={6}
            required
          />
        </label>

        {error ? <p className="text-sm text-rose-600">{error}</p> : null}

        <button
          type="submit"
          className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Need an account?{' '}
        <Link to="/signup" className="font-medium text-slate-900 underline-offset-4 hover:underline">
          Create one now
        </Link>
      </p>
    </section>
  )
}

export default Login
