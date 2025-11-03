import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { auth, db } from '../lib/firebase'
import type { UserRole } from '../types/user'

const roleOptions: Array<{ value: UserRole; label: string; hint: string }> = [
  { value: 'student', label: 'Student', hint: 'Learner access to course content.' },
  { value: 'teacher', label: 'Teacher', hint: 'Manage classes and assignments.' },
  { value: 'admin', label: 'Admin', hint: 'Full access to administrative tools.' },
]

const mapFirebaseError = (error: FirebaseError) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return '?? ?? ?? ??????.'
    case 'auth/invalid-email':
      return '???? ?? ??? ?????.'
    case 'auth/weak-password':
      return '????? ?? 6? ????? ???.'
    default:
      return '???? ?? ? ??? ??????. ?? ? ?? ??????.'
  }
}

function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<UserRole>('student')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    if (!name.trim()) {
      setError('??? ??????.')
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

      setSuccess('????? ???????. ??? ? ???? ??????.')
      setName('')
      setEmail('')
      setPassword('')
      setRole('student')
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(mapFirebaseError(err))
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('? ? ?? ??? ??????.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="mx-auto w-full max-w-2xl">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">????</h1>
        <p className="mt-2 text-sm text-slate-600">
          ??? ???? ??? ???? Firestore? <code>users</code> ???? ???? ?????.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-700">??</span>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-slate-600 transition focus:border-slate-400 focus:ring-2"
              placeholder="???"
              autoComplete="name"
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-700">???</span>
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
            <span className="text-sm font-medium text-slate-700">????</span>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-slate-600 transition focus:border-slate-400 focus:ring-2"
              placeholder="?? 6?"
              autoComplete="new-password"
              minLength={6}
              required
            />
          </label>
        </div>

        <fieldset className="space-y-4">
          <legend className="text-sm font-medium text-slate-700">?? ??</legend>
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
        {success ? <p className="text-sm text-emerald-600">{success}</p> : null}

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            disabled={isLoading}
          >
            {isLoading ? '?? ?...' : '????' }
          </button>
        </div>
      </form>

      <p className="mt-6 text-xs text-slate-500">
        ??? ???? Firestore? <code>users</code> ???? <code>uid</code>, <code>email</code>,
        <code>name</code>, <code>role</code>, <code>createdAt</code> ??? ?????.
      </p>
    </section>
  )
}

export default SignUp
