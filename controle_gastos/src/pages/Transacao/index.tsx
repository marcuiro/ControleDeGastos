import { Button } from "../../components/Button";
import { Container } from "./style";
import { Panel } from "../../components/Panel";
import { DataTable } from "../../components/DataTable";
import { useState } from "react";
import { Modal } from "../../components/Modal";
import { AdicionarTransacaoForm } from "../../components/Transacao/AddFormModal";
import { getTransacoes, removerTransacao } from "../../services/TransacaoAPI";
import { EditTransacaoForm } from '../../components/Transacao/EditFormModal'
import Swal from "sweetalert2";
import type { Transacao } from "../../models/Transacao/Transacao";
import { EnumTipo } from "../../components/Enum/Tipo";
/// <summary>
/// Página de transações com listagem, filtro e botão de adição
/// </summary>
export default function Transacoes() {
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);
    const [transacao, setTransacao] = useState<Transacao>();
    const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
    const [editModalOpen, setEdtModalIsOpen] = useState<boolean>(false);
    const [atualizaDados, setAtualizaDados] = useState<boolean>(true);

    const handleEditModal = (id: string) => {
        setTransacao(transacoes.find((t) => t.id === id));
        setEdtModalIsOpen(true);
    };

    const onTransacaoEdited = async () => {
        setEdtModalIsOpen(false);
        setAtualizaDados(true);
        await obtenhaTransacoes();
    };

    const onTransacaoAdded = async () => {
        setAddModalOpen(false);
        setAtualizaDados(true);
        await obtenhaTransacoes();
    };

    const obtenhaTransacoes = async () => {
        var response = await getTransacoes();

        setTransacoes(response);
    }

    const handleDelete = async (id: string) => {
        Swal.fire({
            title: "Tem certeza que deseja excluir?",
            text: "Não será possível reverter esse ação!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await removerTransacao(id);

                setAtualizaDados(true);
                await obtenhaTransacoes();
            }
        });
    };
    function obterTipo(id: number) {
        const tipoMap = Object.fromEntries(
            EnumTipo.map(e => [e.Key, e.Value])
        );

        return tipoMap[id]
    }

    return (
        <Panel title="Lista de transações cadastradas">
            <Container>
                <div className="btnRegion">
                    <Button
                        title="Adicionar"
                        icon="FaPlus"
                        size="sm"
                        variant="success"
                        onClick={() => setAddModalOpen(true)}
                    />
                </div>

                <div className="list-container">
                    <DataTable<Transacao>
                        resource="ObtenhaTransacoes"
                        atualize={atualizaDados}
                        columns={[
                            { key: "descricao", header: "Descrição", filterable: true },
                            { key: "valor", header: "Valor" },
                            { value: (t) => t.pessoa.nome, header: "Pessoa" },
                            { value: (t) => t.categoria.descricao, header: "Categoria" },
                            { value: (t) => obterTipo(t.tipo)!, header: "Tipo" },
                        ]}
                        data={transacoes}
                        buttons={[
                            {
                                icon: "FaPenToSquare",
                                variant: "warning",
                                onClick: (p) => handleEditModal(p.id)
                            },
                            {
                                icon: "FaTrash",
                                variant: "danger",
                                onClick: (p) => handleDelete(p.id)
                            }
                        ]}
                        onDadosAtualizados={(p) => { setTransacoes(p) }}
                    />
                </div>
            </Container>

            <Modal
                title="Adicionar Transação"
                icon="edit"
                isOpen={addModalOpen}
                onCloseModal={() => setAddModalOpen(!addModalOpen)}
            >
                <AdicionarTransacaoForm onAdded={onTransacaoAdded} />
            </Modal>

            <Modal
                title="Editar Transação"
                icon="edit"
                isOpen={editModalOpen}
                onCloseModal={() => setEdtModalIsOpen(!editModalOpen)}
            >
                {transacao && (
                    <EditTransacaoForm
                        id={transacao.id}
                        pessoaId={transacao.pessoaId}
                        categoriaId={transacao.categoriaId}
                        tipo={transacao.tipo}
                        descricao={transacao.descricao}
                        valor={transacao.valor}
                        onEdit={onTransacaoEdited}
                    />
                )}
            </Modal>
        </Panel>
    );
}