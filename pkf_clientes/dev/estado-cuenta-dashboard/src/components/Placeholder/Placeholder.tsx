export function Placeholder({ className }: { className?: string }) {
  return (
    <div className="placeholder-glow">
      <span
        className={`placeholder ${className ? className : "col-12"}`}
      ></span>
    </div>
  );
}
