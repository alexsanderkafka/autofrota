
import {
    ContainerToggleButton,
} from './style';

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