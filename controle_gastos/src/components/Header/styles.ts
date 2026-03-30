import styled from 'styled-components';
/// <summary>
/// Css de cabeçalho
/// </summary>
export const Container = styled.div`

  strong {
    display: flex;
    align-items: center;
    gap: 8px; 
    font-size: 18px;
    padding-top: 7px;
    padding-left: 7px;
    background-color: #1a2229;
  }

  .title {
    margin: 0px 0px 7px 0px;
    color: white;
    padding: 0;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background-color: #fff; /* fundo branco */
    border-radius: 50%;      /* borda arredondada */
    box-shadow: 0 2px 6px rgba(0,0,0,0.2); /* sombra leve */
    border: 1px solid #ddd;  /* borda */
    margin-bottom: 7px
  }

  .icon-wrapper img {
    width: 20px;
    height: 20px;
  }
    
  .formContent {
    margin-top: 8px;
  }
`;