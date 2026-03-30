import styled from "styled-components";
/// <summary>
/// Css de página inicial das categorias
/// </summary>
export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  div.btnRegion {
    display: flex;
    flex: 1;
    margin-top: 1rem;

    justify-content: end;
  }

  div.search-container {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: end;

    div.inputs-container {
      flex: 1;
      max-width: 30rem;
    }

    div.btn-container {
      display: flex;
      flex: 1;
      justify-content: space-between;
      padding: 0 0.725rem;
    }
  }

  div.list-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    padding: 0 0.25rem;

    th.col-options,
    td.col-options {
      width: 3rem;
    }
  }
`;
