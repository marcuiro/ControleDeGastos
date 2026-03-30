import { useState } from "react"

import { Icon } from "../Icon"
import { Container, InputContainer, InputTitle } from "./styles"
/// <summary>
/// Componente de input
/// </summary>
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    title: string,
    icon?: string,
    placeholder?: string
}

export function Input({ title, placeholder, icon, ...props }: InputProps) {
    const [activated, setActivated] = useState<boolean>(false);
    return (
        <Container>
            <InputTitle>
                {title}
                {(icon) && activated && (
                    <small>
                        <Icon name={icon} />
                    </small>
                )}
            </InputTitle>
            <InputContainer $activated={activated}>
                <input {...props} placeholder={placeholder ? placeholder : title} onFocus={() => setActivated(true)} onBlur={() => setActivated(false)} />
                {icon && <Icon name={icon} />}
            </InputContainer>
        </Container>
    )
}
