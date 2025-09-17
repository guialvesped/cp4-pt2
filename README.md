# 📱 Task Management App

Um aplicativo de gerenciamento de tarefas desenvolvido com React Native e Expo, oferecendo uma experiência completa de organização pessoal com autenticação, notificações e suporte multilíngue.

## ✨ Funcionalidades

### 🔐 Autenticação
- **Registro de usuário** com email e senha
- **Login seguro** integrado com Firebase Auth
- **Logout** com confirmação
- **Persistência de sessão** automática

### 📋 Gerenciamento de Tarefas
- **Criar tarefas** com título, descrição e data de vencimento
- **Visualizar todas as tarefas** em uma lista organizada
- **Marcar tarefas como concluídas** com um toque
- **Excluir tarefas** com confirmação
- **Sincronização em tempo real** com Firebase Firestore

### 🔔 Notificações
- **Notificações push** automáticas para novas tarefas
- **Lembretes** baseados na data de vencimento
- **Configuração inteligente** de canais de notificação

### 🌍 Internacionalização
- **Suporte a 3 idiomas**: Português, Inglês e Espanhol
- **Troca de idioma** em tempo real
- **Persistência da preferência** do usuário

### 🎨 Temas
- **Modo claro e escuro** disponíveis
- **Alternância automática** com base nas preferências do sistema
- **Persistência do tema** escolhido

### 💡 Ideias de Tarefas
- **Sugestões automáticas** de atividades via API externa
- **Inspiração diária** para produtividade

## 🚀 Como Usar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI instalado globalmente: `npm install -g @expo/cli`
- Dispositivo Android/iOS ou emulador configurado

### Instalação

1. **Clone o repositório**
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd cp4
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure o Firebase**
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
   - Ative Authentication (Email/Password)
   - Ative Firestore Database
   - Substitua as configurações em `src/services/firebaseConfig.ts`

4. **Inicie o aplicativo**
   ```bash
   npm start
   # ou
   yarn start
   ```

5. **Execute em dispositivo/emulador**
   - Para Android: `npm run android`
   - Para iOS: `npm run ios`
   - Para Web: `npm run web`

### Primeiro Uso

1. **Registre-se** na tela inicial ou faça login se já tiver conta
2. **Explore** as sugestões de tarefas na tela principal
3. **Crie sua primeira tarefa** tocando no botão "+"
4. **Configure** o tema e idioma conforme sua preferência
5. **Gerencie** suas tarefas marcando como concluídas ou excluindo

## 📚 Tecnologias e Bibliotecas

### Core Framework
- **React Native 0.81.4** - Framework mobile multiplataforma
- **Expo 54.0.8** - Plataforma de desenvolvimento
- **TypeScript 5.9.2** - Tipagem estática

### Navegação e Roteamento
- **expo-router 6.0.6** - Sistema de roteamento baseado em arquivos

### Backend e Autenticação
- **Firebase 12.2.1** - Backend completo (Auth + Firestore)
- **Firestore** - Banco de dados NoSQL em tempo real

### Estado e Queries
- **@tanstack/react-query 5.89.0** - Gerenciamento de estado servidor
- **React Context** - Gerenciamento de estado local

### UI e Estilização
- **react-native-paper 5.14.5** - Componentes Material Design
- **@expo/vector-icons** - Ícones vetoriais
- **react-native-vector-icons 10.3.0** - Biblioteca adicional de ícones

### Internacionalização
- **react-i18next 15.7.3** - Sistema de traduções
- **i18next 25.5.2** - Core da internacionalização

### Armazenamento e Persistência
- **@react-native-async-storage/async-storage 2.2.0** - Armazenamento local persistente

### Notificações
- **expo-notifications 0.32.11** - Sistema de notificações push
- **expo-device 8.0.7** - Informações do dispositivo

### HTTP e APIs
- **axios 1.12.2** - Cliente HTTP para requisições

### Desenvolvimento
- **@types/react** - Tipagens TypeScript para React

## 📁 Estrutura do Projeto

```
cp4/
├── app/                          # Telas do aplicativo (expo-router)
│   ├── _layout.tsx              # Layout raiz com providers
│   ├── index.tsx                # Tela de login
│   ├── RegisterScreen.tsx       # Tela de registro
│   ├── HomeScreen.tsx           # Tela principal
│   └── CreateTaskScreen.tsx     # Tela de criar tarefa
├── src/
│   ├── components/              # Componentes reutilizáveis
│   │   ├── LanguageSelector.tsx # Seletor de idioma
│   │   ├── LogoutButton.tsx     # Botão de logout
│   │   ├── TaskCard.tsx         # Cartão de tarefa
│   │   ├── TaskIdeas.tsx        # Sugestões de tarefas
│   │   └── ThemeToggleButton.tsx # Alternador de tema
│   ├── context/                 # Contextos React
│   │   ├── AuthContext.tsx      # Contexto de autenticação
│   │   ├── ThemeContext.tsx     # Contexto de tema
│   │   └── QueryClientProvider.tsx # Provider do React Query
│   ├── locales/                 # Arquivos de tradução
│   │   ├── pt.json             # Português
│   │   ├── en.json             # Inglês
│   │   └── es.json             # Espanhol
│   └── services/                # Serviços e APIs
│       ├── auth.ts             # Serviços de autenticação
│       ├── firebaseConfig.ts   # Configuração Firebase
│       ├── i18n.ts             # Configuração i18n
│       ├── notification.ts     # Serviços de notificação
│       └── boredApi.ts         # API de sugestões
└── package.json                # Dependências e scripts
```
### Integrantes
Guilherme Alves Pedroso - RM555357
Edvan Davi - RM554733
Rafael Romanini - RM554637
