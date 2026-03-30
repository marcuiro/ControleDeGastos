import { Form } from "react-router-dom";
import { editarPessoa } from "../../../services/PessoasAPI";
import { Container } from "../styles";
import { useEffect, useState } from "react";
import { Input } from "../../Input";
import { Button } from "../../Button";
/// <summary>
/// Componente para modal de edição de pessoas.
/// Neste projeto os modais não diferem mas a criação do componente é para o caso de procedimentos separados feitos em modais
/// </summary>
interface EditarPessoaFormProps {
    id: string;
    idade: number;
    nome: string;
    onEdit: () => Promise<void>;
}

export function EditPessoaForm({
    ...props
}: EditarPessoaFormProps) {
    const [nome, setNome] = useState<string>(props.nome);
    const [idade, setIdade] = useState<number>(props.idade);

    const resetForm = () => {
        setIdade(0);
        setNome("");
    };

    const editPessoaHandler = async (
        evt: React.FormEvent<HTMLFormElement>
    ) => {
        evt.preventDefault();
        await editarPessoa(
            props.id,
            nome,
            idade
        );

        resetForm();
        await props.onEdit();
    };

    useEffect(() => {
        setIdade(props.idade);
        setNome(props.nome);
    }, []);

    return (
        <Form onSubmit={editPessoaHandler}>
            <Container>
                <Input
                    title="Idade *"
                    type="number"
                    onChange={(evt) => setIdade(Number.parseInt(evt.target.value))}
                    defaultValue={props.idade}
                    required={true}
                />

                <Input
                    title="Nome *"
                    onChange={(evt) => setNome(evt.target.value)}
                    defaultValue={props.nome}
                    required={true}
                />

                <div className="btnRegion">
                    <Button type="submit" title="Salvar" size="sm" icon="FaPlus" />
                </div>
            </Container>
        </Form>
    );
}
