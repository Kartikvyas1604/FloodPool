export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pitch-dark">
      <div className="flex flex-col items-center gap-3">
        <span className="font-league text-2xl tracking-widest text-chalk/30 uppercase">
          404
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-corner-flag">
          INVALID FIXTURE
        </span>
        <a
          href="/"
          className="font-mono text-[10px] uppercase tracking-widest text-chalk/40 hover:text-chalk/60 underline underline-offset-4 mt-2"
        >
          Return to Scoreboard
        </a>
      </div>
    </div>
  );
}
