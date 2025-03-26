import {
    ContainerFormsButton
} from "./style";


interface FormButtonProps{
    children: string;
    onClick: () => void;
}

export default function FormButton({children = "button", onClick = () => {}}: FormButtonProps){
    return(
        <ContainerFormsButton
            type="submit"
            onClick={onClick}
        >
            {children}
        </ContainerFormsButton>
    );
}