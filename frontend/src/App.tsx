import { useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import About from './routes/About'
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import SignUp from './routes/SignUp'
import Login from './routes/Login'
import RequireAuth from './components/RequireAuth'
import StudentDashboard from './routes/dashboard/StudentDashboard'
import TeacherDashboard from './routes/dashboard/TeacherDashboard'
import AdminDashboard from './routes/dashboard/AdminDashboard'
import DashboardLanding from './routes/dashboard/DashboardLanding'
import { useAuth } from './contexts/AuthContext'
import { getDashboardPath } from './utils/roles'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-slate-900 text-white shadow'
      : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900',
  ].join(' ')

function App() {
  const { profile, signOut } = useAuth()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const dashboardPath = profile ? getDashboardPath(profile.role) : '/login'

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true)
      await signOut()
    } catch (error) {
      console.error('Failed to sign out', error)
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <NavLink to="/" className="text-xl font-semibold text-slate-900">
            Vite Tailwind Starter
          </NavLink>
          <nav className="flex items-center gap-2">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            {profile ? (
              <>
                <NavLink to={dashboardPath} className={navLinkClass}>
                  Dashboard
                </NavLink>
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900 disabled:opacity-70"
                >
                  {isSigningOut ? 'Signing out...' : 'Sign Out'}
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>
                <NavLink to="/signup" className={navLinkClass}>
                  Sign Up
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<DashboardLanding />} />
          </Route>
          <Route element={<RequireAuth allowRoles={['student']} />}>
            <Route path="/dashboard/student" element={<StudentDashboard />} />
          </Route>
          <Route element={<RequireAuth allowRoles={['teacher']} />}>
            <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
          </Route>
          <Route element={<RequireAuth allowRoles={['admin']} />}>
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-5xl px-6 py-4 text-sm text-slate-500">
          Copyright {new Date().getFullYear()} Vite Tailwind Starter. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default App
