import { useState } from "react";

import styled from "styled-components";

import { useForm } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const MainContainer = styled.div`
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
        border-color: #2563EB;
    }

    .small-field{
        max-width: 100%;
    }
    
`

const ContainerSmallFields = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: auto;
`

const ContainerFormsButton = styled.button`
    width: 100%;
    height: auto;
    margin-top: 20px;
    padding: 15px 0px;
    background-color: #2563EB;
    color: #FFF;
    font-size: 20px;
    font-family: "Roboto", sans-serif;
    border: none;
    border-radius: 5px;
    transition: 0.3s;
    cursor: pointer;

    &:hover{
        background-color: #1A4CA0;
    }
`

interface FormButtonProps{
    children: string;
    onClick: () => void;
}

function FormButton({children = "button", onClick = () => {}}: FormButtonProps){
    return(
        <ContainerFormsButton
            type="submit"
            onClick={onClick}
        >
            {children}
        </ContainerFormsButton>
    );
}

const ContainerFooterRegister = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-bottom: 30px;

    font-family: 'Roboto', sans-serif;

    p{
        font-size: 20px;
        font-weight: 100;
        color: #343434;
    }

    .footer-title{
        margin-bottom: 20px;
    }

    span{
        color: #2563EB;
    }
`


function FooterRegister(){
    return(
        <ContainerFooterRegister>
            <p className="footer-title">Já possui uma conta? <span>Abaixe o app e faça o login</span></p>
            <p>Precisa de ajuda? Entre em contato com o nosso suporte:</p>
            <p>autofrota@gmail.com <span>|</span> (00) 0 0000-0000</p>
        </ContainerFooterRegister>
    );
}

interface FormProps{
    typeForm: string;
}
export default function Forms({typeForm = "Pessoa física"}: FormProps){

    const { register, handleSubmit, formState: {errors} } = useForm();
    //const selectedOption = watch("terms");

    const [checked, setChecked] = useState(false);

    const handleChange = (event: any) => {
        setChecked(event.target.checked);
    };

    const onSubmit = async ( data:any ) => {
        console.log(data);
    }

    function renderFields(type: string): any{
        if(type == "Pessoa física"){
            return(
                <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "273px"
                }}
                >
                    <label
                    >{errors.zipCode ? errors.zipCode.message?.toString() : "Cep*"}</label>
                    <input 
                    className="custom-input"
                    {...register('zipCode', {required: "Por favor, digite um cep!"})}
                    type="text" placeholder='00000-000'
                    style={{
                        borderColor: errors.password && "red",
                    }}
                    />
                </div>
            );
        }

        return(
            <ContainerSmallFields>
                    <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "273px"
                    }}
                    >
                        <label
                        >{errors.zipCode ? errors.zipCode.message?.toString() : "Cep*"}</label>
                        <input 
                        className="custom-input"
                        {...register('zipCode', {required: "Por favor, digite um cep!"})}
                        type="text" placeholder='00000-000'
                        style={{
                            borderColor: errors.password && "red",
                        }}
                        />
                    </div>

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "273px"
                    }}
                    >
                        <label>{errors.cnpj ? errors.cnpj.message?.toString() : "CNPJ*"}</label>
                        <input 
                        className="custom-input"
                        {...register('cnpj', {required: "Por favor, digite um CNPJ!"})}
                        type="text" placeholder='00.000.000/0000-00'
                        style={{
                            borderColor: errors.confirmPassword && "red"
                        }}
                        />
                    </div>
                </ContainerSmallFields>
        );
            

    }
    
    return(
        <MainContainer>
            <form onSubmit={handleSubmit(onSubmit)}>

                <label>{errors.name ? errors.name.message?.toString() : typeForm == "Pessoa física" ? "Nome completo*" : "Nome da empresa*"}</label>
                <input
                className="custom-input"
                {...register('name', {required: "Por favor, digite um nome!"})}
                type="text" placeholder={typeForm == "Pessoa física" ? "Digite seu nome completo" : "Digite o nome da empresa"}
                style={{
                    borderColor: errors.name && "red"
                }}
                />

                <label>{errors.email ? errors.email.message?.toString() : "E-mail*"}</label>
                <input 
                className="custom-input"
                {...register('email', {
                required: "Por favor, digite um e-mail!",
                pattern:{
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Digite um e-mail válido!"
                }
                })} 
                type="email" id="email" placeholder='seu.email@gmail.com'
                style={{
                    borderColor: errors.email && "red"
                }}
                />

                <ContainerSmallFields>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "273px"
                    }}>
                        <label>{errors.password ? errors.password.message?.toString() : "Senha*"}</label>
                        <input 
                        className="custom-input"
                        {...register('password', {required: "Por favor, digite uma senha!"})}
                        type="password" placeholder='Mínimo 8 caracteres'
                        style={{
                            borderColor: errors.password && "red"
                        }}
                        />
                    </div>

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "273px"
                    }}
                    >
                        <label>{errors.confirmPassword ? errors.confirmPassword.message?.toString() : "Confirmar senha*"}</label>
                        <input 
                        className="custom-input"
                        {...register('confirmPassword', {required: "Por favor, confirme sua senha!"})}
                        type="password" placeholder='Digite novamente a senha'
                        style={{
                            borderColor: errors.confirmPassword && "red"
                        }}
                        />
                    </div>
                </ContainerSmallFields>

                {
                    renderFields(typeForm)
                }
                
                <label>{errors.local ? errors.local.message?.toString() : "Endereço*"}</label>
                <input 
                className="custom-input"
                {...register('local', {required: "Por favor, digite um endereço!"})}
                type="text" placeholder='Ex: Av. Exemplo, 1000, Bairro exemplo'
                style={{
                    borderColor: errors.local && "red"
                }}
                />

                <label>{errors.phone ? errors.phone.message?.toString() : "Telefone*"}</label>
                <input 
                className="custom-input"
                {...register('phone', {required: "Por favor, digite um número de telefone!"})}
                type="text" placeholder='(00) 0 0000-0000'
                style={{
                    borderColor: errors.phone && "red"
                }}
                />

                <FormControlLabel
                    control={
                        <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        color="primary"
                        name="terms"
                        />
                    }
                    label="Aceito os termos de uso e a politíca de privacidade."
                />

                <FormButton children="Criar conta" onClick={() => {}}/>
            </form>

            <FooterRegister/>
        </MainContainer>
    );
}