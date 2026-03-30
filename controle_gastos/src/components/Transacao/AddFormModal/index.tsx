import { useEffect, useState } from "react";
import { Container } from "../styles";
import { adicionarTransacao } from "../../../services/TransacaoAPI";
import { getPessoas } from "../../../services/PessoasAPI";
import { getCategorias } from "../../../services/CategoriasAPI";
import { Form } from "react-router-dom";
import { Input } from "../../Input";
import { Button } from "../../Button";
import { Select } from "../../Select";
import { EnumTipo } from "../../Enum/Tipo";
import type { Pessoa } from "../../../models/Pessoas/Pessoa";
import type { Categoria } from "../../../models/Categoria/Categoria";
/// <summary>
/// Componente para modal de adição de transações.
/// Neste projeto os modais não diferem mas a criação do componente é para o caso de procedimentos separados feitos em modais
/// </summary>
interface AdicionarTransacaoFormProps {
    onAdded: () => Promise<void>;
}

export function AdicionarTransacaoForm({
    onAdded,
}: AdicionarTransacaoFormProps) {
    const [categoriaId, setCategoria] = useState<string>("");
    const [pessoaId, setPessoa] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [valor, setValor] = useState<number>(0);
    const [tipo, setTipo] = useState<number>(0);
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

    const adicionarTransacaoHandler = async (
        evt: React.FormEvent<HTMLFormElement>
    ) => {
        evt.preventDefault();

        await adicionarTransacao(
            categoriaId,
            pessoaId,
            descricao,
            valor,
            tipo
        );

        resetForm();
        await onAdded();
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
        <Form onSubmit={adicionarTransacaoHandler}>
            <Container>
                <Select
                    title="Tipo *"
                    onChange={(evt) => setTipo(Number.parseInt(evt.target.value))}
                    options={EnumTipo.map(f => {
                        return { id: f.Key.toString(), description: f.Value! }
                    })}
                    required={true}
                />

                <Select
                    title="Pessoa *"
                    onChange={(evt) => setPessoa(evt.target.value)}
                    options={pessoas.map(p => {
                        return { id: p.id, description: p.nome }
                    })}
                    required={true}
                />

                <Select
                    title="Categoria *"
                    onChange={(evt) => setCategoria(evt.target.value)}
                    options={categorias.map(c => {
                        return { id: c.id, description: c.descricao! }
                    })}
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
