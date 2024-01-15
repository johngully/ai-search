type CardProps = { children?: React.ReactNode, className?: string, title?: string };
export function Card({children, className, title}: CardProps) {
  return (
    <div className={`rounded-xl border-gray-200 border bg-white p-4 ${className}`}>
      <Title text={title}></Title>
      {children}
    </div>
  )
}

type FooterProps = { children?: React.ReactNode, className?: string };
export function Footer({children, className}: FooterProps) {
  return <p className={`text-sm text-gray-300 text-center pt-6 ${className}`}>{children}</p>
}

type TitleProps = { children?: React.ReactNode, className?: string, text?: string };
export function Title({children, className, text}: TitleProps) {
  return text ? <h1 className="block text-black text-xl font-bold mb-4">{text}</h1> : <></>
}
