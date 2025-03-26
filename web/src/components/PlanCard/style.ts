import styled from "styled-components";

import { colors } from "../../styles/theme";

export const Card = styled.div`
    display: flex;
    flex-direction: column;

    width: 496px;
    height: 615px;

    border: 1px solid ${colors.border.main};
    border-radius: 5px;

    hr{
        margin: 0px 32px 32px 32px;
        height: 1px;
        background-color: ${colors.border.main};
    }
`;

export const HeaderCard = styled.div`
    margin-top: 96px;
    margin-left: 32px;
    margin-right: 32px;
    margin: 96px 32px 28px 32px;

    h3{
        font-size: 20px;
    }

    p{
        font-size: 56px;
        font-weight: bold;
    }
`

export const ContainerItens = styled.div`
    margin: 0px 32px;

    p{
        font-size: 16px;
    }
`

export const Item = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
    margin-bottom: 16px;

`