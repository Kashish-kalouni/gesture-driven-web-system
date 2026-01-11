import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-100">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 md:px-20">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-rose-900 via-rose-400 to-sky-500">
          Gesture-Controlled Web System
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Navigate websites effortlessly using <span className="text-emerald-400 font-semibold">AI-powered hand gestures</span>.
          Touchless, fast, and futuristic. Perfect for accessibility and interactive demos.
        </p>
        <button className="mt-10 px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-full shadow-lg shadow-emerald-500/30 transition-transform active:scale-95">
          Try Gestures Demo
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-20 grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-slate-900/80 p-6 rounded-xl shadow-xl hover:shadow-emerald-500/30 transition-shadow">
          <img src="https://i.imgur.com/jkY4Fjw.png" alt="Palm Open" className="mx-auto h-20 mb-4" />
          <h3 className="font-semibold text-lg mb-2">PALM OPEN</h3>
          <p className="text-slate-400 text-sm">Go to Home page effortlessly with an open palm gesture.</p>
        </div>

        <div className="bg-slate-900/80 p-6 rounded-xl shadow-xl hover:shadow-sky-500/30 transition-shadow">
          <img src="https://i.imgur.com/1ovG9YB.png" alt="Swipe Left" className="mx-auto h-20 mb-4" />
          <h3 className="font-semibold text-lg mb-2">SWIPE LEFT</h3>
          <p className="text-slate-400 text-sm">Swipe left to navigate to the About section quickly.</p>
        </div>

        <div className="bg-slate-900/80 p-6 rounded-xl shadow-xl hover:shadow-fuchsia-500/30 transition-shadow">
          <img src="https://i.imgur.com/4LrxJXQ.png" alt="Swipe Right" className="mx-auto h-20 mb-4" />
          <h3 className="font-semibold text-lg mb-2">SWIPE RIGHT</h3>
          <p className="text-slate-400 text-sm">Swipe right to jump directly to the Contact page.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-800 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Gesture-Controlled Web System · Built by{" "}
        <span className="text-emerald-400 font-medium">Kashish Kalouni</span>
      </footer>
    </div>
  );
};

export default HomePage;
