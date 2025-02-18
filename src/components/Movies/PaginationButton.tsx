const PaginationButton = ({
  children,
  className = "bg-[#313131]",
  onClick,
  disable = false,
}: {
  children: React.ReactNode;
  className?: string;
  disable?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      disabled={disable}
      onClick={onClick}
      className={`w-6 h-6 text-white flex justify-center items-center rounded text-xs font-normal ${className}`}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
