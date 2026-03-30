import { useState } from "react";
import { Icon } from "../Icon";
import { Container, SelectContainer, SelectTitle } from "./style";
/// <summary>
/// Componente de caixa de seleção
/// </summary>
interface SelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
    title: string;
    icon?: string;
    options: { id: string; description: string }[];
}

export function Select({ title, options, icon, ...props }: SelectProps) {
    const [activated, setActivated] = useState<boolean>(false);

    return (
        <Container>
            <SelectTitle>
                {title}
                {icon && activated && (
                    <small>
                        <Icon name={icon} />
                    </small>
                )}
            </SelectTitle>
            <SelectContainer $activated={activated}>
                <select
                    {...props}
                    onFocus={() => setActivated(true)}
                    onBlur={() => setActivated(false)}
                >
                    <option value={""}></option>
                    {options.map((opt) => (
                        <option key={`opt-${opt.id}`} value={opt.id}>
                            {opt.description}
                        </option>
                    ))}
                </select>
            </SelectContainer>
        </Container>
    );
}
