import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-md flex-col items-center gap-6 text-center">
      <div className="rounded-full bg-slate-100 p-6 text-4xl">:(</div>
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Page not found</h1>
        <p className="mt-3 text-sm text-slate-600">
          The page you requested does not exist or may have been moved. Use the button below to go
          back to the home page.
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-slate-800"
      >
        Go home
      </Link>
    </section>
  )
}

export default NotFound
