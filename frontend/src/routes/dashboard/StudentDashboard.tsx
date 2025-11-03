function StudentDashboard() {
  return (
    <section className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-semibold text-slate-900">Student Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">
          Keep an eye on the classes you are enrolled in and monitor assignment progress.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">My courses</h2>
          <p className="mt-2 text-sm text-slate-600">Review the modules you are studying and stay ahead of deadlines.</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Learning progress</h2>
          <p className="mt-2 text-sm text-slate-600">Track completed work, quiz scores, and overall performance.</p>
        </article>
      </div>
    </section>
  )
}

export default StudentDashboard
