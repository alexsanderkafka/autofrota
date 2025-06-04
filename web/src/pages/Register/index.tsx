import Logo from "../../assets/autofrota.png";
import ToggleButton from "../../components/Togglebutton";
import { useEffect, useState } from "react";
import Form from "../../components/Form";
import ToggleButtonPlanCard from "../../components/ButtonPlanCard";

import {
    RegisterContainer,
    RegisterTexts
} from './style';

export default function Register(){

    const [typeCard, setTypeCard] = useState("basic");
    const [typeToggle, setTypeToggle] = useState("Pessoa física");
    const [planId, setPlanId] = useState<number>(1);

    useEffect(() => {

        console.log(typeCard);

        console.log(planId);

    }, [typeCard])

    return(
        <RegisterContainer>
            <img src={Logo} alt="" />

            <RegisterTexts>
                <h1>Cadastre-se</h1>
                <p>Escolha o seu o plano e comece a gerenciar sua frota</p>
            </RegisterTexts>

            <ToggleButtonPlanCard itensOne={["Controle de gasto de combustível", "Controle de manutenções", "Checklist nos veículos"]} itensTwo={["Todas as funcionalidades do básico", "Emissão de alertas", "Geração de relatório para cada veículo", "Análise de gastos", "Suporte ao cliente"]} setType={setTypeCard} type={typeCard} setPlanId={setPlanId}/>

            <ToggleButton type={typeToggle} setActive={setTypeToggle} />

            <Form typeForm={typeToggle} planId={planId}/>


        </RegisterContainer>
    );
}