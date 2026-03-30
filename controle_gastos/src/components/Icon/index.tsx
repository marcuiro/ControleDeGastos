import * as Icons from "react-icons/fa6";
/// <summary>
/// Componente de ícones react
/// </summary>
export function Icon ({ name, size = 24 }: { name: string, size?: number }) {
    const IconComponent = (Icons as any)[name];
    if (!IconComponent) return null;
    return <IconComponent size={size} />;
};