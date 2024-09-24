interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={`${className} p-1 w-48 rounded`} {...props}>
      {children}
    </button>
  );
}
