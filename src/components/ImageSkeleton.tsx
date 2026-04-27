export default function ImageSkeleton() {
  return (
    <div className="relative aspect-square overflow-hidden rounded-sm border border-white/10 bg-slate-950/40 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 via-slate-700/50 to-slate-800/50 animate-pulse" />
    </div>
  );
}
