import { NavLink, Route, Routes } from 'react-router-dom'
import About from './routes/About'
import Home from './routes/Home'
import NotFound from './routes/NotFound'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-slate-900 text-white shadow'
      : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900',
  ].join(' ')

function App() {
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
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
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
