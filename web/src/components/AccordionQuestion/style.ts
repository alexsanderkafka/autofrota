import styled from "styled-components";

import { colors } from "../../styles/theme";

//talves precise alterar o width para %
export const Accordion = styled.div`
    border: 1px solid ${colors.border.main};
    border-radius: 10px;
    overflow: hidden;
    width: 1042px;
    margin-bottom: 20px;

    transition: 0.3s;

    .arrow {
        font-size: 12px;
        transition: transform 0.3s ease;
        color: ${colors.text.other};
    }

    .arrow .open {
        transform: rotate(180deg);
    }
`

export const AccordionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: ${colors.primary.white};
    cursor: pointer;
    color: ${colors.text.secondaray};

    h3 {
        margin: 0;
        font-size: 24px;
        color: ${colors.text.primary};
        font-weight: 500;
    }
`

export const AccordionContent = styled.div`
    padding: 15px 20px;
    border-top: 3px solid ${colors.border.main};

    p {
        margin: 0;
        color: ${colors.text.secondaray};
        line-height: 1.5;
    }
`