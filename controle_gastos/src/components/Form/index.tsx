import type { ReactNode } from "react"
import { FormContainer } from "./styles"
/// <summary>
/// Componente de formulário genérico
/// </summary>
interface FormProps extends React.ButtonHTMLAttributes<HTMLFormElement> {
  children: ReactNode
}

export function Form({ children, ...props } : FormProps) {
  return (
    <FormContainer {...props}>
      {children}
    </FormContainer>
  )
}