import styled from "styled-components";

/// <summary>
/// Css de tabela
/// </summary>
export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  
  div.filtro-container {
    flex: 1;
    display: flex;
    padding: 1rem 0;

    .filter-input {
      flex: 1;
      max-width: 30rem;
    }

    .button-container {
      display: flex;
      align-items: flex-end;
      justify-content: baseline;
    }
  }

  div.pagination-container {
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 1rem 0;
    gap: 0.675rem;
    font-size: 0.875rem;

    button {
      padding: 0.125rem;
      width: 3rem;
      font-size: 0.875rem;
      border-radius: 5px;
      border: 0px;
    }
  }

  table {
    th.actions-col {
      width: 4rem;
    }

    td.actions-col {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
  }
`;
