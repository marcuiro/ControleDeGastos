import type { ReactNode } from "react";
import { PanelContainer, PanelHeader, PanelBody } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
/// <summary>
/// Componente de painel usado como plano de fundo em telas dentro de módulos
/// </summary>
interface PanelProps {
  title: string,
  icon?: string,
  children: ReactNode,
}

export function Panel({ title, icon, children } : PanelProps) {
  return (
    <PanelContainer>
      <PanelHeader>
        {icon && <FontAwesomeIcon icon={icon as IconProp} />}
        {title}
      </PanelHeader>
      <PanelBody>
        {children}
      </PanelBody>
    </PanelContainer>
  )
}