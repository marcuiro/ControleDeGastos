import { Icon } from "../Icon"
import { ButtonContainer } from "./styles"

/// <summary>
/// Componente genérico de botões
/// </summary>
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'warning' | 'danger' | 'success',
  size?: 'lg' | 'md' | 'sm',
  icon?: string,
  title?: string,
  loading?: boolean
}

export function Button({ variant = 'default', size = 'md', loading = false, icon, title, ...props }: ButtonProps) {

  return (
    <ButtonContainer $variant={variant} $size={size} {...props} disabled={loading}>
      {!loading ? (
        <>
          {icon && <Icon name={icon} />}
          <p>{title}</p>
        </>
      ) : (
        <div className="loading">
          <Icon name="FaArrowsRotate" />
        </div>
      )}
    </ButtonContainer>
  )
}