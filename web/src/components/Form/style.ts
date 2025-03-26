import styled from "styled-components";
import { colors } from "../../styles/theme";

export const MainContainer = styled.div`
    margin-top: 60px;   
    
    form{
        display: flex;
        flex-direction: column;
        width: 586px;

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
    
`;
    
export const ContainerSmallFields = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: auto;
`;