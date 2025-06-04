import styled from "styled-components";
import { colors } from "../../styles/theme";
import { breakpoints } from "../../styles/breakpoints";

export const ContainerToggleButtonPlanCard = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 50px;

    @media (max-width: ${breakpoints.tablet}) {
        flex-direction: column;
        align-items: center;
        width: 80%;
    }

    @media (max-width: ${breakpoints.laptop}) {
        flex-direction: column;
    }
`;

export const PlanCardButton = styled.div`
    display: flex;
    flex-direction: column;

    width: 496px;
    height: 615px;

    border-radius: 5px;

    margin-top: 50px;
    margin-bottom: 50px;

    cursor: pointer;

    hr{
        margin: 0px 32px 32px 32px;
        height: 1px;
        background-color: ${colors.primary.main};
    }

    &.active-toggle {
        background-color: ${colors.primary.white};
        border: 1px solid ${colors.border.main};
    }

    @media (max-width: ${breakpoints.tablet}) {
        width: 100%;
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
`;

export const ContaierItens = styled.div`
    margin: 0px 32px;

    p{
        font-size: 16px;
    }
`;

export const Item = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
    margin-bottom: 16px;
`