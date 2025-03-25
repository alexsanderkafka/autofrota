import styled from "styled-components";

const ContainerToggleButton = styled.div`
    width: 489px;
    height: 43px;
    border: 1px solid #2563EB;
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
    }

    .active{
        background-color: #2563EB;    
        border: 1px solid #2563EB;
        border-radius: 5px;
        color: #FFF;
    }

    
    @media only screen and (max-width: 768px) {
        .toggle-button{
            font-size: 14px;
        }
    }
`


interface ToggleButtonProps{
    setActive: (state: string) => void;
    //setPlan: (state: number) => void;
    type: string;
}

export default function ToggleButton({type, setActive}:ToggleButtonProps){

    return(
        <ContainerToggleButton>
            <button
                className={`toggle-button ${type === "Pessoa física" ? "active" : ""}`}
                onClick={() => { 
                    setActive("Pessoa física");
                }}
            >Pessoa física
            </button>

            <button
                className={`toggle-button ${type === "Pessoa jurídica" ? "active" : ""}`}
                onClick={() => {
                    setActive("Pessoa jurídica");
                }}
            >Pessoa jurídica
            </button>
        </ContainerToggleButton>
    );

}