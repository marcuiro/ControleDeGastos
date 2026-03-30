import { Button } from "../../components/Button";
import { Container } from "./styles";
import { Panel } from "../../components/Panel";
import { DataTable } from "../../components/DataTable";
import type { Pessoa } from "../../models/Pessoas/Pessoa";
import { useState } from "react";
import { Modal } from "../../components/Modal";
import { AdicionarPessoaForm } from "../../components/Pessoa/AddFormModal";
import { getPessoas, removerPessoa } from "../../services/PessoasAPI";
import { EditPessoaForm } from "../../components/Pessoa/EditFormModal";
import Swal from "sweetalert2";
/// <summary>
/// Página de pessoas com listagem, filtro e botão de adição
/// </summary>
export default function Pessoas() {
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [pessoa, setPessoa] = useState<Pessoa>();
    const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
    const [editModalOpen, setEdtModalIsOpen] = useState<boolean>(false);
    const [atualizaDados, setAtualizaDados] = useState<boolean>(true);

    const handleEditModal = (id: string) => {
        setPessoa(pessoas.find((p) => p.id === id));
        setEdtModalIsOpen(true);
    };

    const onPessoaEdited = async () => {
        setEdtModalIsOpen(false);
        setAtualizaDados(true);
        await obtenhaPessoas();
    };

    const onPessoaAdded = async () => {
        setAddModalOpen(false);
        setAtualizaDados(true);
        await obtenhaPessoas();
    };

    const obtenhaPessoas = async () => {
        var response = await getPessoas();

        setPessoas(response);
    }

    function obtenhaTotalTipo(pessoa: Pessoa, tipo: number): number {
        var transacoes = pessoa.transacoes.map(t => {
            if (t.tipo == tipo)
                return t.valor
            return 0;
        })

        const sum: number = transacoes.reduce((ac, val) => {
            return ac + val;
        }, 0)
        return sum;
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
                await removerPessoa(id);

                setAtualizaDados(true);
                await obtenhaPessoas();
            }
        });
    };

    return (
        <Panel title="Lista de pessoas cadastradas">
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
                    <DataTable<Pessoa>
                        resource="ObtenhaPessoas"
                        atualize={atualizaDados}
                        columns={[
                            { key: "nome", header: "Nome", filterable: true },
                            { key: "idade", header: "Idade" },
                            { value: (p) => obtenhaTotalTipo(p, 1).toString(), header: "Receitas" },
                            { value: (p) => obtenhaTotalTipo(p, 0).toString(), header: "Despesa" },
                            { value: (p) => (obtenhaTotalTipo(p, 1) - obtenhaTotalTipo(p, 0)).toString(), header: "Saldo" }
                        ]}
                        data={pessoas}
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
                        onDadosAtualizados={(p) => { setPessoas(p) }}
                    />
                </div>
            </Container>

            <Modal
                title="Adicionar Pessoa"
                icon="edit"
                isOpen={addModalOpen}
                onCloseModal={() => setAddModalOpen(!addModalOpen)}
            >
                <AdicionarPessoaForm onAdded={onPessoaAdded} />
            </Modal>

            <Modal
                title="Editar Pessoa"
                icon="edit"
                isOpen={editModalOpen}
                onCloseModal={() => setEdtModalIsOpen(!editModalOpen)}
            >
                {pessoa && (
                    <EditPessoaForm
                        id={pessoa.id}
                        nome={pessoa.nome}
                        idade={pessoa.idade}
                        onEdit={onPessoaEdited}
                    />
                )}
            </Modal>
        </Panel>
    );
}