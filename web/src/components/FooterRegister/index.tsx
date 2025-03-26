import {
    ContainerFooterRegister,
    FooterTitle
} from './style'

export default function FooterRegister(){
    return(
        <ContainerFooterRegister>
            <FooterTitle>Já possui uma conta? <span>Abaixe o app e faça o login</span></FooterTitle>
            <p>Precisa de ajuda? Entre em contato com o nosso suporte:</p>
            <p>autofrota@gmail.com <span>|</span> (00) 0 0000-0000</p>
        </ContainerFooterRegister>
    );
}