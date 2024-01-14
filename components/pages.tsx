
type FooterProps = { children?: React.ReactNode, className?: string };
export function Footer({children, className}: FooterProps) {
  return <p className={`text-sm text-gray-300 text-center pt-6 ${className}`}>{children}</p>
}