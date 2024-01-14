import { useFormStatus } from 'react-dom'

type SubmitButtonProps = { children?: React.ReactNode, className?: string };
export function SubmitButton({children, className} : SubmitButtonProps) {
  const {pending} = useFormStatus();
  return <button type="submit" aria-disabled={pending} className={`flex items-center justify-center rounded-lg p-2 px-6 font-light text-white border-gray-200 bg-[#33CC99] bg-opacity-80 hover:bg-opacity-100 shadow-md hover:shadow-lg hover:contrast-more ml-2 ${className}`}>{children}</button>
}

type FormPendingContainerProps = { children?: React.ReactNode, className?: string };
export function FormPendingContainer({children, className}: FormPendingContainerProps) {
  const {pending} = useFormStatus();
  let animate = pending ? "animate-pulse" : "";
  return <span className={`${className} ${animate}`}>{children}</span>
}