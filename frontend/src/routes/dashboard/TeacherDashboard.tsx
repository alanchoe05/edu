function TeacherDashboard() {
  return (
    <section className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-semibold text-slate-900">Teacher Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">
          Manage active classes, keep assignments current, and review student outcomes.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Course management</h2>
          <p className="mt-2 text-sm text-slate-600">Publish new lessons, refine existing material, and schedule content releases.</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Student feedback</h2>
          <p className="mt-2 text-sm text-slate-600">Review submissions, grade work, and give actionable guidance fast.</p>
        </article>
      </div>
    </section>
  )
}

export default TeacherDashboard
