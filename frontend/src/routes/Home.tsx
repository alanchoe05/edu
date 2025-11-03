function Home() {
  return (
    <section className="flex flex-1 flex-col gap-10">
      <div className="rounded-3xl bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400 p-px shadow-lg">
        <div className="rounded-[calc(1.5rem-1px)] bg-white p-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            React + TypeScript + Tailwind + Firebase Starter
          </h1>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Build quickly with Vite, style with Tailwind CSS, manage navigation with React Router,
            and connect backend services with the Firebase SDK.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://vitejs.dev/guide/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-slate-800"
            >
              Read the Vite guide
            </a>
            <a
              href="https://tailwindcss.com/docs/installation"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300 hover:text-slate-900"
            >
              Tailwind documentation
            </a>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Starter highlights</h2>
          <ul className="mt-4 grid gap-3 text-sm text-slate-600">
            <li>Fast development workflow powered by Vite</li>
            <li>Utility-first styling with Tailwind CSS</li>
            <li>Page-level routing handled by React Router</li>
            <li>Firebase SDK ready for auth, data, and storage</li>
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Next steps</h2>
          <ol className="mt-4 grid gap-3 text-sm text-slate-600">
            <li>Define Firebase environment variables in a local <code>.env</code> file.</li>
            <li>Import the initialized Firebase app from <code>src/lib/firebase.ts</code>.</li>
            <li>Add the Firebase services you need, such as auth or Firestore.</li>
            <li>Extend the UI using Tailwind CSS utility classes.</li>
          </ol>
        </article>
      </div>
    </section>
  )
}

export default Home
