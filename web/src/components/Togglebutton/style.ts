import styled from "styled-components";

import { colors } from "../../styles/theme";
import { breakpoints } from "../../styles/breakpoints";

export const ContainerToggleButton = styled.div`
    width: 489px;
    height: 43px;
    border: 1px solid ${colors.primary.main};
    border-radius: 5px;
  
    display: flex;
    flex-direction: row;
  
    padding: 3px;

    .toggle-button{
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;

        border-color: transparent;
        
        font-weight: 300;
        transition: 0.2s;
        background-color: ${colors.primary.white}; 
    }

    .active{
        background-color: ${colors.primary.main};    
        border: 1px solid ${colors.border.main};
        border-radius: 5px;
        color: ${colors.text.white};
    }

    
    @media (max-width: ${breakpoints.tablet}) {
        width: 80%;
        .toggle-button{
            font-size: 14px;
        }
    }
`