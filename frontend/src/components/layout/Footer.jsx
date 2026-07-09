function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

          <div>
            <h2 className="text-2xl font-bold text-white">
              🎤 SpeakAI
            </h2>

            <p className="mt-2 text-slate-400">
              Learn English confidently with AI.
            </p>
          </div>

          <div className="flex gap-8 text-slate-400">
            <a href="#">Home</a>
            <a href="#">Features</a>
            <a href="#">Practice</a>
            <a href="#">Contact</a>
          </div>

        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-slate-500">
          © {new Date().getFullYear()} SpeakAI. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;