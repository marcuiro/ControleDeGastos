import styled from "styled-components";
/// <summary>
/// Css de componente Home
/// </summary>
export const HomeContainer = styled.div`
  padding: 1.25rem;

    .modulo-title {
        display: table-row;
        justify-content: left;
    }
    display: flex;
    gap: 1rem;
`;

export const ModulosContainer = styled.div`
`;

export const RecursosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-template-columns: repeat(auto-fit, 100px);
  margin-top: 1.25rem;
  gap: 1rem;

  a {
    display: flex;
    width: 18.75rem;
    height: 6.75rem;
    text-decoration: none;
    border-radius: 8px;
    overflow: hidden;
    color: white;
    background-color: #2d353c;

    header {
      p {
        font-size: 0.5rem;
        color: var(--black-100);
      }

      height: 2rem;
      padding: 0.5rem;
      border-bottom: 1px var(--white-500) solid;
    }

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      color: var(--white-300);
    }

    hr {
        margin: 5px;
        width: 2px;
        background-color: #fff;
        border-radius: 8px;
    }
  }
`;
