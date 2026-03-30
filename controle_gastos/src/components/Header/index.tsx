import { Container } from './styles'
import CostIcon from '../../assets/cost-icon.svg'
import { Link } from 'react-router-dom'
/// <summary>
/// Componente de cabeçalho
/// </summary>
export function Header() {
  return (
      <Container>
          <strong>
            <Link to="/">
              <span className="icon-wrapper">
                <img src={CostIcon} alt="Ícone" />
              </span>
            </Link>
            <h4 className='title'>Controle de Gastos</h4>
          </strong>
          <div className="formContent">
          </div>
      </Container>
  )
}