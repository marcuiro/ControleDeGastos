import { Form } from "react-router-dom";
import { editarCategoria } from "../../../services/CategoriasAPI";
import { Container } from "../styles";
import { useEffect, useState } from "react";
import { Input } from "../../Input";
import { Button } from "../../Button";
import { Select } from "../../Select";
import { EnumFinalidade } from "../../Enum/Finalidade";
/// <summary>
/// Componente para modal de edição categorias.
/// Neste projeto os modais não diferem mas a criação do componente é para o caso de procedimentos separados feitos em modais
/// </summary>
interface EditarCategoriaFormProps {
    id: string;
    finalidade: number;
    descricao: string;
    onEdit: () => Promise<void>;
}

export function EditCategoriaForm({
    ...props
}: EditarCategoriaFormProps) {
    const [descricao, setDescricao] = useState<string>(props.descricao);
    const [finalidade, setFinalidade] = useState<number>(props.finalidade);

    const resetForm = () => {
        setFinalidade(0);
        setDescricao("");
    };

    const editCategoriaHandler = async (
        evt: React.FormEvent<HTMLFormElement>
    ) => {
        evt.preventDefault();
        await editarCategoria(
            props.id,
            descricao,
            finalidade
        );

        resetForm();
        await props.onEdit();
    };

    useEffect(() => {
        setFinalidade(props.finalidade);
        setDescricao(props.descricao);
    }, []);

    return (
        <Form onSubmit={editCategoriaHandler}>
            <Container>
                <Select
                    title="Finalidade *"
                    onChange={(evt) => setFinalidade(Number.parseInt(evt.target.value))}
                    options={EnumFinalidade.map(f =>{
                        return { id: f.Key.toString(), description: f.Value! }
                    })}
                    defaultValue={finalidade}
                    required={true}
                />

                <Input
                    title="Descrição *"
                    onChange={(evt) => setDescricao(evt.target.value)}
                    defaultValue={props.descricao}
                    required={true}
                />

                <div className="btnRegion">
                    <Button type="submit" title="Salvar" size="sm" icon="FaPlus" />
                </div>
            </Container>
        </Form>
    );
}
