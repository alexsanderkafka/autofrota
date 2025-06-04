import { useEffect, useState } from "react";

import { useForm } from 'react-hook-form';
import FooterRegister from "../FooterRegister";
import FormButton from "../FormButton";
import { AnimatePresence, motion } from 'framer-motion';

import {
    ContainerSmallFields,
    MainContainer,
    SmallFields,
    ErrorContainer
} from './style';
import api from "../../api";

interface FormProps{
    typeForm: string;
    planId: number;
}
export default function Form({typeForm = "Pessoa física", planId = 1}: FormProps){

    const { register, handleSubmit, formState: {errors} } = useForm();
    //const selectedOption = watch("terms");

    const [error, setError] = useState<string | null>(null);

    const MotionErrorContainer = motion(ErrorContainer);


    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    function verifyPass(pass: string, confirmPass: string){
        if(pass != confirmPass){
            setError("As senhas não são iguais!");
            return false;
        };

        return true;
    }

    async function onSubmit ( data:any ){

        if(!verifyPass(data.pass, data.confirmPass)) return;

        const currentData: any = {
            name: data.name,
            email: data.email,
            pass: data.pass,
            confirmPass: data.confirmPass,
            zipCode: data.zipCode,
            social: data.social,
            address: data.address,
            phone: data.phone,
            planId: planId
        }
        
        try{
            const response = await api.post("/auth/register", currentData);

            if(response.status === 200){
                const urlToPayment: string = response.data.initPoint;

                window.location.href = urlToPayment;
            }
        }catch(err: any){
            console.log(err.response.data.message);

            if(err.response.status === 409){
                setError(err.response.data.message);
            }

            if(err.response.status === 400){
                setError(err.response.data.message)
            }

            if(err.response.status === 404){
                setError(err.response.data.message)
            }
        }
    }
    
    return(
        <MainContainer>
            
            {
                <AnimatePresence>
                    {
                        error && (
                            <MotionErrorContainer
                            key="error"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            >
                                <p>{error}</p>
                            </MotionErrorContainer>
                        )
                    }
                </AnimatePresence>
            }

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
                    <SmallFields>
                        <label>{errors.pass ? errors.pass.message?.toString() : "Senha*"}</label>
                        <input 
                        className="custom-input"
                        {...register('pass', {required: "Por favor, digite uma senha!"})}
                        type="password" placeholder='Digite sua senha'
                        style={{
                            borderColor: errors.pass && "red"
                        }}
                        />
                    </SmallFields>

                    <SmallFields
                    >
                        <label>{errors.confirmPass ? errors.confirmPass.message?.toString() : "Confirmar senha*"}</label>
                        <input 
                        className="custom-input"
                        {...register('confirmPass', {required: "Por favor, confirme sua senha!"})}
                        type="password" placeholder='Digite novamente a senha'
                        style={{
                            borderColor: errors.confirmPass && "red"
                        }}
                        />
                    </SmallFields>
                </ContainerSmallFields>

                <ContainerSmallFields>
                    <SmallFields>
                        <label
                        >{errors.zipCode ? errors.zipCode.message?.toString() : "Cep*"}</label>
                        <input 
                        className="custom-input"
                        {...register('zipCode', {required: "Por favor, digite um cep!"})}
                        type="text" placeholder='00000-000'
                        style={{
                            borderColor: errors.zipCode && "red",
                        }}
                        />
                    </SmallFields>

                    <SmallFields>
                        <label>{errors.social ? errors.social.message?.toString() : typeForm === "Pessoa física" ? "CPF*" : "CNPJ*"}</label>
                        <input 
                        className="custom-input"
                        {...register('social', {required: typeForm === "Pessoa física" ? "Por favor, digite um CPF!" : "Por favor, digite um CNPJ!"})}
                        type="text" placeholder= {typeForm === "Pessoa física" ? '000.000.000-00' : '00.000.000/0000-00'}
                        style={{
                            borderColor: errors.social && "red"
                        }}
                        />
                    </SmallFields>
                </ContainerSmallFields>
                
                <label>{errors.address ? errors.address.message?.toString() : "Endereço*"}</label>
                <input 
                className="custom-input"
                {...register('address', {required: "Por favor, digite um endereço!"})}
                type="text" placeholder='Ex: Av. Exemplo, 1000, Bairro exemplo'
                style={{
                    borderColor: errors.address && "red"
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

                <FormButton children="Criar conta" onClick={() => {}}/>
            </form>

            <FooterRegister/>
        </MainContainer>
    );
}