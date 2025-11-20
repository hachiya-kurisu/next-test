import { ReactNode, ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent text-white hover:bg-accent-hover focus:ring-accent',
  secondary:
    'bg-gray-100 text-primary hover:bg-gray-200 focus:ring-gray-300',
  outline:
    'border border-border text-primary hover:bg-gray-50 focus:ring-gray-300',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  const d = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const cls = `rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${variantClasses[variant]} ${sizeClasses[size]} ${d} ${className}`.trim();

  return (
    <button className={cls} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
