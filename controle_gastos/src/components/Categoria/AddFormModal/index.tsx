import { useState } from "react";
import { Container } from "../styles";
import { adicionarCategoria } from "../../../services/CategoriasAPI";
import { Form } from "react-router-dom";
import { Input } from "../../Input";
import { Button } from "../../Button";
import { Select } from "../../Select";
import { EnumFinalidade } from "../../Enum/Finalidade";

/// <summary>
/// Componente para modal de adição de categorias.
/// Neste projeto os modais não diferem mas a criação do componente é para o caso de procedimentos separados feitos em modais
/// </summary>
interface AdicionarCategoriaFormProps {
    onAdded: () => Promise<void>;
}

export function AdicionarCategoriaForm({
    onAdded,
}: AdicionarCategoriaFormProps) {
    const [finalidade, setFinalidade] = useState<number>(0);
    const [descricao, setDescricao] = useState<string>("");

    const resetForm = () => {
        setFinalidade(0);
        setDescricao("");
    };

    const adicionarCategoriaHandler = async (
        evt: React.FormEvent<HTMLFormElement>
    ) => {
        evt.preventDefault();

        await adicionarCategoria(
            descricao,
            finalidade
        );

        resetForm();
        await onAdded();
    };

    return (
        <Form onSubmit={adicionarCategoriaHandler}>
            <Container>
                <Select
                    title="Finalidade *"
                    onChange={(evt) => setFinalidade(Number.parseInt(evt.target.value))}
                    options={EnumFinalidade.map(f => {
                        return { id: f.Key.toString(), description: f.Value! }
                    })}
                    required={true}
                />

                <Input title="Descricao *" onChange={(evt) => setDescricao(evt.target.value)}
                    required={true}/>

                <div className="btnRegion">
                    <Button type="submit" title="Salvar" size="sm" icon="FaPlus" />
                </div>
            </Container>
        </Form>
    );
}
