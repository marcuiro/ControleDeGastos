import type { ReactNode } from "react";

import { BackgroundModal, ModalBody, ModalContainer, ModalContent, ModalHeader } from './styles';
import { Icon } from "../Icon"; 
/// <summary>
/// Componente genérico para modais
/// </summary>
interface ModalProps {
  title: string,
  icon?: string,
  isOpen: boolean,
  onCloseModal: () => void,
  children: ReactNode
}

export function Modal({ title, icon, isOpen, onCloseModal, children } : ModalProps) {
  if(isOpen) {
    return (
      <BackgroundModal>
        <ModalContainer>
          <ModalContent isToggle={isOpen}>
            <ModalHeader>
              <div className="headerTitle">
                {icon && <Icon name={icon} />}
                <h4>{title}</h4>
              </div>
              <button className="closeButton" onClick={onCloseModal}><Icon name="FaXmark" /></button>
            </ModalHeader>            
            <ModalBody>
              {children}
            </ModalBody>
          </ModalContent>          
        </ModalContainer>
      </BackgroundModal>
    )
  }

  return null;
}