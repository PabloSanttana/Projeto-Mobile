<h1 align="center">Projeto-Mobile</h1>
<p align="center">🚀 nodejs + react native + ReactJs</p>

Projeto desenvolvido por <strong> Guilherme Pablo De Santana Maciel </strong> <br>

### 🛠 Tecnologia Utilizadas no Desenvolvimento 

As seguintes ferramentas foram usadas na construção do projeto:

- [Nodejs](https://nodejs.org/en/)   
- [React Native](https://reactnative.dev/)   
- [ReactJs](https://pt-br.reactjs.org/docs/getting-started.html)  
- [Android Studio](https://developer.android.com/studio)
- [Socket.io](https://socket.io/)
- [Api Rest](https://www.google.com/search?sxsrf=ALeKk02AGokhbkw15tLf-tnwxppEMmANzQ%3A1613073130290&ei=6oolYJyOEfa85OUPuYGV6AY&q=rest+api&oq=api+rest&gs_lcp=Cgdnd3Mtd2l6EAEYBDIHCCMQsAMQJzIHCAAQsAMQQzIHCAAQsAMQQzIHCAAQsAMQQzIHCAAQsAMQQzIHCAAQsAMQQzIHCAAQsAMQQzIHCAAQsAMQQzIHCAAQsAMQQzIHCAAQsAMQQ1AAWABgw4QDaAJwAngAgAGOAogBjgKSAQMyLTGYAQCqAQdnd3Mtd2l6yAEKwAEB&sclient=gws-wiz)

## Informação do projeto
Desenvolver uma aplicação que consiste em um aplicativo de monitoramento em tempo real dos dados vitais de pacientes em home care. Esses dados serão recebidos por um sistema servidor, que será compartilhado entre os módulos do cuidador e do neurologista.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Android Studio](https://developer.android.com/studio), [Nodejs](https://nodejs.org/en/), [ReactJs](https://pt-br.reactjs.org/docs/getting-started.html),
e [React Native](https://reactnative.dev/)

### 🎲 Rodando o projeto
```bash
# Clone este repositório
$ git clone https://github.com/PabloSanttana/Projeto-Mobile.git

# Dentro das Pastas centraldemonitoramento, homeCare e socketMonitoramento

$ npm install ou yarn 
# Com isso serão instaladas as dependecias do projeto

# Rodando o servidor, no servidor temos dois neurologista cadastraos para teste um com CRM 1111111, outro com CRM 2222222

$ cd socketMonitoramento
$ yarn start ou mpn start

# rodando a interface do servidor, onde serão cadastrados os pacientes para fazer a simulação do monitoramento
# a interface roda na porta localhost:3000, cada aba de navegação será um paciente cadastrado 

$ cd centraldemonitoramento
$ yarn start ou mpn start

# rodando dispositivo móvel, para que o aplicativo funcione você deve colocar o ipe da sua maquina no local:
# src/services/locallhost.json neste arquivo você colocar seu ipe

$ npx react-native start

# Com isso o aplicativo deve funcuinar como esperado 
 ```
