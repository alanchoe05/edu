import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { auth, db } from '../lib/firebase'
import type { UserRole } from '../types/user'
import { getDashboardPath } from '../utils/roles'

const roleOptions: Array<{ value: UserRole; label: string; hint: string }> = [
  { value: 'student', label: 'Student', hint: 'Learn new material and complete coursework.' },
  { value: 'teacher', label: 'Teacher', hint: 'Manage classes, assignments, and student progress.' },
  { value: 'admin', label: 'Admin', hint: 'Oversee users, content, and platform configuration.' },
]

const mapFirebaseError = (error: FirebaseError) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'This email is already in use.'
    case 'auth/invalid-email':
      return 'Please provide a valid email address.'
    case 'auth/weak-password':
      return 'Password must be at least 6 characters long.'
    default:
      return 'We could not create your account right now. Please try again later.'
  }
}

function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<UserRole>('student')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { refreshProfile, profile } = useAuth()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Please enter your name.')
      return
    }

    setIsLoading(true)
    try {
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password)
      await updateProfile(credential.user, { displayName: name.trim() })

      await setDoc(doc(db, 'users', credential.user.uid), {
        uid: credential.user.uid,
        email: credential.user.email ?? email.trim(),
        name: name.trim(),
        role,
        createdAt: serverTimestamp(),
      })

      await refreshProfile()
      navigate(getDashboardPath(role), { replace: true })
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
    <section className="mx-auto w-full max-w-2xl">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Create account</h1>
        <p className="mt-2 text-sm text-slate-600">
          Choose a role during sign-up so your details can be added to the Firestore <code>users</code>{' '}
          collection.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-700">Full name</span>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-slate-600 transition focus:border-slate-400 focus:ring-2"
              placeholder="Alex Johnson"
              autoComplete="name"
              required
            />
          </label>

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

          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-slate-600 transition focus:border-slate-400 focus:ring-2"
              placeholder="At least 6 characters"
              autoComplete="new-password"
              minLength={6}
              required
            />
          </label>
        </div>

        <fieldset className="space-y-4">
          <legend className="text-sm font-medium text-slate-700">Choose a role</legend>
          <div className="grid gap-4 lg:grid-cols-3">
            {roleOptions.map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer flex-col gap-2 rounded-xl border p-4 transition ${
                  role === option.value
                    ? 'border-slate-900 bg-slate-900/5 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-slate-900">{option.label}</span>
                  <input
                    type="radio"
                    name="role"
                    value={option.value}
                    checked={role === option.value}
                    onChange={() => setRole(option.value)}
                    className="h-4 w-4"
                  />
                </div>
                <p className="text-sm text-slate-600">{option.hint}</p>
              </label>
            ))}
          </div>
        </fieldset>

        {error ? <p className="text-sm text-rose-600">{error}</p> : null}

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-slate-900 underline-offset-4 hover:underline">
          Log in
        </Link>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        On success, a document containing <code>uid</code>, <code>email</code>, <code>name</code>,
        <code>role</code>, and <code>createdAt</code> is saved to the Firestore <code>users</code>
        collection.
      </p>
    </section>
  )
}

export default SignUp
