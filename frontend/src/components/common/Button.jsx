function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition-all duration-300";

  const styles = {
    primary:
  "bg-indigo-500/40 text-white hover:bg-indigo-500 hover:scale-105 shadow-lg hover:shadow-indigo-500/30",
    secondary:
      "border border-slate-600 text-white hover:bg-slate-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;