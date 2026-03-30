import { Button } from "../../components/Button";
import { Container } from "./styles";
import { Panel } from "../../components/Panel";
import { DataTable } from "../../components/DataTable";
import type { Categoria } from "../../models/Categoria/Categoria";
import { useState } from "react";
import { Modal } from "../../components/Modal";
import { AdicionarCategoriaForm } from "../../components/Categoria/AddFormModal";
import { getCategorias, removerCategoria } from "../../services/CategoriasAPI";
import { EditCategoriaForm } from '../../components/Categoria/EditFormModal'
import Swal from "sweetalert2";
import { EnumFinalidade } from "../../components/Enum/Finalidade";
/// <summary>
/// Página de categorias com listagem, filtro e botão de adição
/// </summary>
export default function Categorias() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoria, setCategoria] = useState<Categoria>();
    const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
    const [editModalOpen, setEdtModalIsOpen] = useState<boolean>(false);
    const [atualizaDados, setAtualizaDados] = useState<boolean>(true);

    const handleEditModal = (id: string) => {
        setCategoria(categorias.find((c) => c.id === id));
        setEdtModalIsOpen(true);
    };

    const onCategoriaEdited = async () => {
        setEdtModalIsOpen(false);
        setAtualizaDados(true);
        await obtenhaCategorias();
    };

    const onCategoriaAdded = async () => {
        setAddModalOpen(false);
        setAtualizaDados(true);
        await obtenhaCategorias();
    };

    const obtenhaCategorias = async () => {
        var response = await getCategorias();

        setCategorias(response);
    }

    function obtenhaTotalTipo(categoria: Categoria, tipo: number): number {
        var transacoes = categoria.transacoes.map(t => {
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
                await removerCategoria(id);

                setAtualizaDados(true);
                await obtenhaCategorias();
            }
        });
    };

    function obterFinalidade(id: number) {
        const finalidadeMap = Object.fromEntries(
            EnumFinalidade.map(e => [e.Key, e.Value])
        );

        return finalidadeMap[id]
    }

    return (
        <Panel title="Lista de categorias cadastradas">
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
                    <DataTable<Categoria>
                        resource="ObtenhaCategorias"
                        atualize={atualizaDados}
                        columns={[
                            { key: "descricao", header: "Descricao", filterable: true },
                            { value: (c) => obterFinalidade(c.finalidade)!, header: "Finalidade" },
                            { value: (c) => obtenhaTotalTipo(c, 1).toString(), header: "Receitas" },
                            { value: (c) => obtenhaTotalTipo(c, 0).toString(), header: "Despesa" },
                            { value: (c) => (obtenhaTotalTipo(c, 1) - obtenhaTotalTipo(c, 0)).toString(), header: "Saldo" }
                        ]}
                        data={categorias}
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
                        onDadosAtualizados={(p) => { setCategorias(p) }}
                    />
                </div>
            </Container>

            <Modal
                title="Adicionar Categoria"
                icon="edit"
                isOpen={addModalOpen}
                onCloseModal={() => setAddModalOpen(!addModalOpen)}
            >
                <AdicionarCategoriaForm onAdded={onCategoriaAdded} />
            </Modal>

            <Modal
                title="Editar Categoria"
                icon="edit"
                isOpen={editModalOpen}
                onCloseModal={() => setEdtModalIsOpen(!editModalOpen)}
            >
                {categoria && (
                    <EditCategoriaForm
                        id={categoria.id}
                        descricao={categoria.descricao}
                        finalidade={categoria.finalidade}
                        onEdit={onCategoriaEdited}
                    />
                )}
            </Modal>
        </Panel>
    );
}