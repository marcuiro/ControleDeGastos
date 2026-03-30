import pluginConfig from "../../../plugins.config.json";
import { HomeContainer, ModulosContainer, RecursosContainer } from "./styles";
import { Icon } from "../Icon";
/// <summary>
/// Componente para apresentação dos módulos em tela inicial
/// </summary>
export function Home() {
    return (
        <HomeContainer>
            {pluginConfig.modules.map((rm, im) => {
                return (
                    <ModulosContainer key={im}>
                        <h3 className="modulo-title">{rm.name}</h3>
                        <RecursosContainer>

                            {rm.resources.map((rr, ir) => {
                                return (
                                    <a href={`/${rm.id}/${rr.id}`} key={ir}>
                                        <header>
                                            <p>{rm.name}</p>
                                            <Icon name={rm.icon} size={60} />
                                        </header>
                                        <hr />
                                        <div>
                                            {rr.name}
                                        </div>
                                    </a>
                                );
                            })}
                        </RecursosContainer>
                    </ModulosContainer>
                );
            })}
        </HomeContainer>
    );
}
