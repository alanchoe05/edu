function About() {
  return (
    <section className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          About This Starter
        </h1>
        <p className="mt-3 max-w-2xl text-base text-slate-600">
          This template assembles a modern React toolchain so you can begin shipping features right
          away. Tailwind CSS, React Router, and the Firebase SDK are wired up to support design
          systems, routing, and backend integrations from day one.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-medium text-slate-900">What is included</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>React 19 with TypeScript</li>
            <li>Vite 5 dev server and bundler</li>
            <li>Tailwind CSS 3.x and PostCSS tooling</li>
            <li>React Router v7 for navigation</li>
            <li>Firebase SDK v12 (modular API)</li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-medium text-slate-900">Great use cases</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Firebase-backed single-page or progressive web apps</li>
            <li>Rapid UI prototyping with Tailwind CSS</li>
            <li>Side projects that need client-side routing</li>
            <li>Team onboarding that favors opinionated tooling</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default About
