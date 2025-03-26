import styled from "styled-components";
import Logo from "../assets/autofrota.png";
import ToggleButton from "../components/ToggleButton";
import { useState } from "react";
import Forms from "../components/Forms";
import ToggleButtonPlanCard from "../components/ButtonPlanCard";


const RegisterContainer = styled.div`

    *{
        font-family: 'Roboto', sans-serif;
    }

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding-top: 50px;

    img{
        width: 200px;
        height: auto;
        margin-bottom: 70px;
    }
`;

const RegisterTexts = styled.div`
    display: flex;
    flex-direction: column;

    text-align: center;

    h1{
        font-size: 40px;
        
    }

    p{
        font-size: 20px;
    }
`

export default function Register(){

    const [typeCard, setTypeCard] = useState("basic");

    const [typeToggle, setTypeToggle] = useState("Pessoa física");

    return(
        <RegisterContainer>
            <img src={Logo} alt="" />

            <RegisterTexts>
                <h1>Cadastre-se</h1>
                <p>Escolha o seu o plano e comece a gerenciar sua frota</p>
            </RegisterTexts>

            <ToggleButtonPlanCard itensOne={["Controle de gasto de combustível", "Controle de manutenções", "Checklist nos veículos"]} itensTwo={["Todas as funcionalidades do básico", "Emissão de alertas", "Geração de relatório para cada veículo", "Análise de gastos", "Suporte ao cliente"]} setType={setTypeCard} type={typeCard}/>

            <ToggleButton type={typeToggle} setActive={setTypeToggle} />

            <Forms typeForm={typeToggle}/>


        </RegisterContainer>
    );
}