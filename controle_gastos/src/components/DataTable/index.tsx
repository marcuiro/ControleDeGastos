import { useEffect, useState } from "react";

import { Button } from "../Button";
import { Container } from "./styles";
import { Service } from "../../services/base";
import { Input } from "../Input";

/// <summary>
/// Componente para geração de tabelas
/// </summary>

const service = new Service();
/// <summary>
/// Coluna com o título, propriedade geral das colunas
/// </summary>
interface Column {
    header: string;
}
/// <summary>
/// Coluna simples, informa se a propriedade é filtrável ou não e a chave (propriedade do objeto que é apresentado na listagem)
/// </summary>
interface SimpleColumn<T> extends Column {
    filterable?: boolean;
    key: keyof T;
}

/// <summary>
/// Coluna customizada, pode levar uma função ou outro tipo de dado customizado para a célula
/// </summary>
interface CustomColumn<T> extends Column {
    value: (instanceData: T) => string;
}

/// <summary>
/// Coluna para botões da linha
/// </summary>
interface ColumnButton<T> {
    icon?: string | undefined;
    label?: string | undefined;
    condition?: (instanceData: T) => boolean;
    onClick: (instanceData: T) => Promise<void> | void;
    variant?: "default" | "warning" | "danger" | "success" | undefined;
}

interface TableProps<T> {
    resource: string;
    atualize: boolean;
    enableFilter?: boolean;
    buttons?: ColumnButton<T>[];
    data: T[] | undefined;
    columns: (SimpleColumn<T> | CustomColumn<T>)[];
    onDadosAtualizados: (data: T[]) => void;
    onRowClick?: (instanceData: T) => Promise<void> | void;
}

export const DataTable = <T extends object>({
    data,
    columns,
    buttons,
    atualize,
    resource,
    enableFilter = true,
    onDadosAtualizados,
    onRowClick,
}: TableProps<T>) => {
    const [filter, setFilter] = useState("");

    useEffect(() => {
        if (atualize) {
            fetchData();
        }
    }, [atualize]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchData();
    };

    const fetchData = async () => {
        try {
            var requestData = await service.requisicaoGET<T[]>(resource);

            columns
                .filter((column) => "filterable" in column)
                .forEach((column) => {
                    if ((column as SimpleColumn<T>).filterable) {
                        var key = (column as SimpleColumn<T>).key as keyof T;
                        requestData = requestData.filter((item) => {
                            const value = item[key];

                            if (value == null) return false;

                            return value.toString().toLowerCase().includes(filter.toLowerCase());
                        });
                    }
                });

            onDadosAtualizados(requestData ?? []);
        } catch (error) {
            console.error("Erro ao buscar os dados: ", error);
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    return (
        <>
            <Container>
                {enableFilter &&
                    columns.filter((col) => (col as SimpleColumn<T>).filterable).length >
                    0 && (
                        <form onSubmit={handleSubmit}>
                            <div className="filtro-container">
                                <div className="filter-input">
                                    <Input
                                        title=""
                                        type="text"
                                        placeholder="Filtrar"
                                        value={filter}
                                        onChange={handleFilterChange}
                                        icon=""
                                    />
                                </div>
                                <div className="button-container">
                                    <Button title="Buscar" icon="FaMagnifyingGlass" size="md" />
                                </div>
                            </div>
                        </form>
                    )}
                <table className="table">
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th key={`header_${index}`}>{column.header}</th>
                            ))}
                            {buttons && buttons.length > 0 && (
                                <th className="actions-col"></th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, index) => (
                            <tr
                                key={index}
                                onClick={() => onRowClick == undefined || onRowClick(item)}
                            >
                                {columns.map((column, index_col) =>
                                    (column as SimpleColumn<T>).key ? (
                                        <td
                                            key={`column_${index}_${index_col}`}
                                        >{`${item[(column as SimpleColumn<T>).key]}`}</td>
                                    ) : (
                                        <td key={`column_${index}_${index_col}`}>
                                            {(column as CustomColumn<T>).value(item)}
                                        </td>
                                    )
                                )}
                                {buttons && buttons.length > 0 && (
                                    <td className="actions-col">
                                        {buttons
                                            .filter(
                                                (btn) =>
                                                    btn.condition == undefined || btn.condition(item)
                                            )
                                            .map((btn, index_btn) => (
                                                <Button
                                                    key={`btn_${index}_${index_btn}`}
                                                    size="sm"
                                                    icon={btn.icon}
                                                    title={btn.label}
                                                    variant={btn.variant}
                                                    onClick={() => btn.onClick(item)}
                                                />
                                            ))}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>
        </>
    );
};
