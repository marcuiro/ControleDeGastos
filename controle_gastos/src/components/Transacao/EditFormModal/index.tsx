import { Form } from "react-router-dom";
import { editarTransacao } from "../../../services/TransacaoAPI";
import { Container } from "../styles";
import { useEffect, useState } from "react";
import { Input } from "../../Input";
import { Button } from "../../Button";
import { Select } from "../../Select";
import type { Pessoa } from "../../../models/Pessoas/Pessoa";
import type { Categoria } from "../../../models/Categoria/Categoria";
import { getPessoas } from "../../../services/PessoasAPI";
import { getCategorias } from "../../../services/CategoriasAPI";
import { EnumTipo } from "../../Enum/Tipo";
/// <summary>
/// Componente para modal de edição de transações.
/// Neste projeto os modais não diferem mas a criação do componente é para o caso de procedimentos separados feitos em modais
/// </summary>
interface EditarTransacaoFormProps {
    id: string;
    pessoaId: string;
    categoriaId: string;
    tipo: number;
    descricao: string;
    valor: number;
    onEdit: () => Promise<void>;
}

export function EditTransacaoForm({
    ...props
}: EditarTransacaoFormProps) {
    const [categoriaId, setCategoria] = useState<string>(props.categoriaId);
    const [pessoaId, setPessoa] = useState<string>(props.pessoaId);
    const [descricao, setDescricao] = useState<string>(props.descricao);
    const [valor, setValor] = useState<number>(props.valor);
    const [tipo, setTipo] = useState<number>(props.tipo);
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const resetForm = () => {
        setCategoria("");
        setDescricao("");
        setPessoa("");
        setDescricao("");
        setValor(0);
        setTipo(0);
    };

    const editTransacaoHandler = async (
        evt: React.FormEvent<HTMLFormElement>
    ) => {
        evt.preventDefault();
        await editarTransacao(
            props.id,
            categoriaId,
            pessoaId,
            descricao,
            valor,
            tipo
        );

        resetForm();
        await props.onEdit();
    };

    useEffect(() => {
        const carregarDados = async () => {
            const [pessoas, categorias] = await Promise.all([
                getPessoas(),
                getCategorias()
            ]);

            setPessoas(pessoas);
            setCategorias(categorias);
        };

        carregarDados();
    }, []);

    return (
        <Form onSubmit={editTransacaoHandler}>
            <Container>
                <Select
                    title="Tipo *"
                    onChange={(evt) => setTipo(Number.parseInt(evt.target.value))}
                    options={EnumTipo.map(f => {
                        return { id: f.Key.toString(), description: f.Value! }
                    })}
                    defaultValue={props.tipo}
                    required={true}
                />

                <Select
                    title="Pessoa *"
                    onChange={(evt) => setPessoa(evt.target.value)}
                    options={pessoas.map(p => {
                        return { id: p.id, description: p.nome }
                    })}
                    defaultValue={props.pessoaId}
                    required={true}
                />

                <Select
                    title="Categoria *"
                    onChange={(evt) => setCategoria(evt.target.value)}
                    options={categorias.map(c => {
                        return { id: c.id, description: c.descricao! }
                    })}
                    defaultValue={props.categoriaId}
                    required={true}
                />

                <Input title="Descricao" onChange={(evt) => setDescricao(evt.target.value)} />
                <Input title="Valor *" onChange={(evt) => setValor(Number.parseFloat(evt.target.value))} type="number" 
                    required={true}/>

                <div className="btnRegion">
                    <Button type="submit" title="Salvar" size="sm" icon="FaPlus" />
                </div>
            </Container>
        </Form>
    );
}
