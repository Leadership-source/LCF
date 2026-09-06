function ActionButton({
  children,
  danger = false,
  onClick,
}: {
  children: React.ReactNode;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border border-gray-400 p-2 transition ${
        danger
          ? "border-red-200 text-red-600 hover:bg-red-50"
          : "hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}

export { ActionButton };
