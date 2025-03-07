export default function Button({
  children,
  onClick,
  isDisabled,
  className,
  addClass,
}) {
  if (!className) {
    className = "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600";
  }

  if (!addClass) {
    className + " " + addClass;
  }

  return (
    <button
      className={className}
      type="submit"
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
