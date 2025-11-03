function AdminDashboard() {
  return (
    <section className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-semibold text-slate-900">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">
          Oversee users, approve content, and keep the platform running smoothly.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">User control</h2>
          <p className="mt-2 text-sm text-slate-600">Adjust roles, activate or suspend accounts, and maintain compliance.</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Content approvals</h2>
          <p className="mt-2 text-sm text-slate-600">Review material submitted by teachers and publish trusted resources.</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Platform insights</h2>
          <p className="mt-2 text-sm text-slate-600">Analyze activity trends and plan operational improvements with confidence.</p>
        </article>
      </div>
    </section>
  )
}

export default AdminDashboard
