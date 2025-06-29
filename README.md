# Desafioo.tech

## O que é o Desafioo.tech?

O Desafioo.tech é uma plataforma open-source de desafios de programação que conecta profissionais, professores e estudantes. A plataforma permite que os usuários pratiquem suas habilidades de programação com desafios reais do mercado, recebam feedbacks e compartilhem suas soluções.

Este é o repositório do frontend. Para o backend/API, acesse: [https://github.com/ArthurSilv4/api-desafioo.tech](https://github.com/ArthurSilv4/api-desafioo.tech)

## Funcionalidades

- **Explorar Desafios:** Visualize desafios criados por profissionais do mercado.
- **Inscrição em Desafios:** Cadastre-se para receber desafios e dicas por e-mail.
- **Administração:** Crie, edite e remova desafios.
- **Comunidade:** Contribua com a plataforma através de issues e sugestões.

## Arquitetura

O projeto foi desenvolvido com uma arquitetura baseada em componentes, utilizando o Next.js como framework principal. A estrutura do projeto foi pensada para ser escalável e de fácil manutenção, separando as responsabilidades em diferentes camadas:

- **Apresentação:** A camada de apresentação é responsável por renderizar a interface do usuário e capturar as interações do usuário. Ela é composta por páginas, componentes, hooks e contextos.
- **Serviços:** A camada de serviços é responsável por fazer a comunicação com a API, buscando e enviando dados.
- **Domínio:** A camada de domínio é responsável por conter as regras de negócio da aplicação. Ela é composta por tipos e validadores.

## Tecnologias

- **Framework:** Next.js
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Formulários:** React Hook Form e Zod
- **Gerenciamento de Estado:** React Query
- **Editor de Markdown:** Bytemd
- **UI Components:** Radix UI e Lucide React
- **Linting:** ESLint
- **Commits:** Commitlint e Husky

## Estrutura do Projeto

- **`/src/app`**: Páginas da aplicação.
- **`/src/components`**: Componentes reutilizáveis.
- **`/src/context`**: Contextos da aplicação.
- **`/src/hooks`**: Hooks personalizados.
- **`/src/lib`**: Funções utilitárias.
- **`/src/providers`**: Provedores da aplicação.
- **`/src/services`**: Serviços da aplicação.
- **`/src/types`**: Tipos da aplicação.
- **`/public`**: Arquivos estáticos.

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/arthursilv4/front-desafioo.tech.git
   ```

2. **Acesse o diretório:**
   ```bash
   cd front-desafioo.tech
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env.local` e adicione:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000/api
   ```

5. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

## Contribuições

Contribuições são bem-vindas! Para contribuir, siga os passos:

1. **Fork o repositório.**
2. **Crie uma nova branch:**
   ```bash
   git checkout -b minha-feature
   ```
3. **Faça suas alterações e commit:**
   ```bash
   git commit -m "feat: minha nova feature"
   ```
4. **Envie suas alterações:**
   ```bash
   git push origin minha-feature
   ```
5. **Abra um Pull Request.**

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
