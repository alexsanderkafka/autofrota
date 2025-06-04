import styled from "styled-components";
import { colors } from "../../styles/theme";
import { breakpoints } from "../../styles/breakpoints";

export const MainContainer = styled.div`
    margin-top: 60px;   

    width: 586px;

    form{
        display: flex;
        flex-direction: column;
        width: 100%;

        margin-bottom: 120px;
    }

    label{
        font-size: 16px;
    }

    .custom-input{
        all: unset;
        border: 1px solid;
        margin-bottom: 15px;
        font-size: 20px;

        padding: 13px 12px 13px 12px;

        border-radius: 5px;
        border-color: ${colors.border.main};
    }

    .small-field{
        max-width: 100%;
    }

    @media (max-width: ${breakpoints.tablet}) {
        width: 80%;
    }
    
`;
    
export const ContainerSmallFields = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: auto;

    @media (max-width: ${breakpoints.tablet}) {
        flex-direction: column;
        
    }
`;


export const SmallFields = styled.div`
    display: flex;
    flex-direction: column;
    width: 273px;
    @media (max-width: ${breakpoints.tablet}) {
        width: auto;
    }
`

export const ErrorContainer = styled.div`
    background-color: ${colors.primary.error};
    color: ${colors.primary.white};
    width: 100%;
    min-height: 47px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    margin-bottom: 20px;
`