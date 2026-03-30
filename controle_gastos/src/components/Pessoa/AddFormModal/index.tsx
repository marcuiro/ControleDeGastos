import { useState } from "react";
import { Container } from '../styles';
import { adicionarPessoa } from "../../../services/PessoasAPI";
import { Form } from "react-router-dom";
import { Input } from "../../Input";
import { Button } from "../../Button";
/// <summary>
/// Componente para modal de adição de Pessoas.
/// Neste projeto os modais não diferem mas a criação do componente é para o caso de procedimentos separados feitos em modais
/// </summary>
interface adicionarPessoaFormProps {
    onAdded: () => Promise<void>;
}

export function AdicionarPessoaForm({
    onAdded,
}: adicionarPessoaFormProps) {
    const [idade, setIdade] = useState<number>(0);
    const [nome, setNome] = useState<string>("");

    const resetForm = () => {
        setIdade(0);
        setNome("");
    };

    const adicionarPessoaHandler = async (
        evt: React.FormEvent<HTMLFormElement>
    ) => {
        evt.preventDefault();

        await adicionarPessoa(
            nome,
            idade
        );

        resetForm();
        await onAdded();
    };

    return (
        <Form onSubmit={adicionarPessoaHandler}>
            <Container>
                <Input
                    title="Idade *"
                    type="number"
                    onChange={(evt) => setIdade(Number.parseInt(evt.target.value))}
                    required={true}
                />

                <Input title="Nome*" onChange={(evt) => setNome(evt.target.value)} 
                    required={true}/>

                <div className="btnRegion">
                    <Button type="submit" title="Salvar" size="sm" icon="FaPlus" />
                </div>
            </Container>
        </Form>
    );
}
