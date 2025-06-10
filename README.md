# AutoFrota
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/alexsanderkafka/autofrota/blob/main/LICENSE) 

# Sobre o projeto

# Integrações
- Firebase (storage)
- Redis
- Mercado pago

## Layout Mobile

![mobile-1]

## Layout web
![web-1]

![web-2]

![web-3]

## DER - Diagrama de entidade relacional
![der]

# Tecnologias utilizadas
## Back end
- Java 17
- Spring boot 3.3.10

## Front end
- mobile: React Native com expo
- web: React

## Banco de dados
- MySQL

## Para deploy

# Como executar o projeto
## Pré-requisitos
- Para testar a parte de pagamento, é necessário utilizar ngrok para criar um túnel e disponibilizar uma url pública para o webhook do mercado pago
- É necessário uma conta teste no mercado pago e configurado uma integração
- Instalação do Redis e rodar ele em uma docker (local ou nuvem)
- Projeto configurado no firebase para baixar a key.json (cole na pasta back-end/src/main/resources) e permissões no storage para read e write

## Banco de dados
- MySQL instalado e configurado (local ou nuvem)
  
```bash
criar no seu gerenciador de banco de dados o banco auto_frota
```

## Back end
Pré-requisitos: 
- Java 17 instalado

```bash
# Configurar o application.yaml
server:
  port: 8080
file:
  upload-dir: uploads/
firebase:
  url-bucket: set url bucket
security:
  jwt:
    token:
      secret-key: 53cr37
      expire-length: 3600000
spring:
  jpa:
    database: mysql
  datasource:
    url: jdbc:mysql://localhost:3306/auto_frota
    username: set username
    password: set password
  flyway:
    enabled: true
  mail:
    host: smtp.gmail.com
    port: 587
    username: set username
    password: set password
    properties:
      mail: 
        smtp: 
          auth: true
          starttls: 
            enable: true
  redis:
    host: set host
    port: set port
mercado-pago:
  access-token: set access token
  public-key: set public key
  webhook:
    secret: set webhook secret

profile:
  image: set url image

# Execute o projeto
```

## Mobile
Pré-requisitos: 
- Node
- npm e npx
  
```bash
# entrar na pasta
cd mobile

# instalar as dependências
npm install

# Rodar o projeto
npx expo start

# Para testar o projeto
utilize o app do Expo ou emulador do Android Studio
```

## Web
Pré-requisitos: 
- Node
- npm

```bash
# entrar na pasta
cd web

# instalar as dependências
npm install

# Rodar o projeto
npm run dev
```
  
