# AutoFrota
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/alexsanderkafka/autofrota/blob/main/LICENSE) 

# Sobre o projeto
O foco desse projeto, foi criar um projeto multiplaforma que tinha como objetivo o estudo de todo o ciclo de desenvolvimento de software para fins de estudo. Nesse projeto, foi criado um app utilizando React Native com Expo Go, para parte de cadastro de novos usuários foi criado um sistema web com React e uma API utilzando Java com Spring Boot.

# Integrações
- Firebase (storage)
- Redis
- Mercado pago

## Layout Mobile
<img src="https://github.com/alexsanderkafka/autofrota/blob/main/assets/onboarding_1.png" alt="mobile-1" width="300"/> <img src="https://github.com/alexsanderkafka/autofrota/blob/main/assets/onboarding_2.png" alt="mobile-2" width="300"/> 

<img src="https://github.com/alexsanderkafka/autofrota/blob/main/assets/onboarding_3.png" alt="mobile-3" width="300"/> <img src="https://github.com/alexsanderkafka/autofrota/blob/main/assets/onboarding_4.png" alt="mobile-4" width="300"/> 

<img src="https://github.com/alexsanderkafka/autofrota/blob/main/assets/login.png" alt="mobile-5" width="300"/> <img src="https://github.com/alexsanderkafka/autofrota/blob/main/assets/home.png" alt="mobile-6" width="300"/>

<img src="https://github.com/alexsanderkafka/autofrota/blob/main/assets/vehicles_active.png" alt="mobile-7" width="300"/> <img src="https://github.com/alexsanderkafka/autofrota/blob/main/assets/vehicle_maintenance.png" alt="mobile-8" width="300"/>

<img src="https://github.com/alexsanderkafka/autofrota/blob/main/assets/vehicle_alert.png" alt="mobile-9" width="300"/> <img src="https://github.com/alexsanderkafka/autofrota/blob/main/assets/report.png" alt="mobile-10" width="300"/>

<img src="https://github.com/alexsanderkafka/autofrota/blob/main/assets/profile.png" alt="mobile-11" width="300"/> <img src="https://github.com/alexsanderkafka/autofrota/blob/main/assets/vehicle.gif" alt="mobile-12" width="300"/>

<img src="https://github.com/alexsanderkafka/autofrota/blob/main/assets/checklist.png" alt="mobile-13" width="300"/> <img src="https://github.com/alexsanderkafka/autofrota/blob/main/assets/checklist_2.png" alt="mobile-14" width="300"/>

<img src="https://github.com/alexsanderkafka/autofrota/blob/main/assets/add_new_fuel.png" alt="mobile-15" width="300"/> <img src="https://github.com/alexsanderkafka/autofrota/blob/main/assets/add_new_maintenance_done.png" alt="mobile-16" width="300"/>

<img src="https://github.com/alexsanderkafka/autofrota/blob/main/assets/add_new_maintenance_scheduled.png" alt="mobile-17" width="300"/>

## Layout web
![web-1](https://github.com/alexsanderkafka/autofrota/blob/main/assets/record_web_1.gif)

![web-2](https://github.com/alexsanderkafka/autofrota/blob/main/assets/record_web_2.gif)

## DER - Diagrama de entidade relacional
![der](https://github.com/alexsanderkafka/autofrota/blob/main/assets/auto_frota.png)

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
  
