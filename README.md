# 🎓 API de Cursos

Uma API REST moderna e robusta para gerenciamento de cursos, construída com **Fastify**, **TypeScript** e **Zod** para validação de dados.

## ✨ Características

- **Fastify**: Framework web rápido e eficiente para Node.js
- **TypeScript**: Tipagem estática para maior segurança e produtividade
- **Zod**: Validação de esquemas com TypeScript
- **Swagger/OpenAPI**: Documentação automática da API
- **Drizzle ORM**: ORM moderno para banco de dados
- **PostgreSQL**: Banco de dados robusto e confiável
- **Docker**: Containerização para desenvolvimento e produção

## 🚀 Tecnologias Utilizadas

- **Backend**: Node.js + Fastify
- **Linguagem**: TypeScript
- **Banco de Dados**: PostgreSQL
- **ORM**: Drizzle ORM
- **Validação**: Zod
- **Documentação**: Swagger/OpenAPI
- **Logs**: Pino (com pino-pretty para desenvolvimento)
- **Containerização**: Docker

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL
- Docker (opcional, para desenvolvimento)

## 🛠️ Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd nodeJs
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

4. **Configure o banco de dados**
   ```bash
   # Gere as migrações
   npm run db:generate
   
   # Execute as migrações
   npm run db:migrate
   ```

## 🚀 Executando a Aplicação

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

### Docker
```bash
npm run docker:init
```

## 📚 Endpoints da API

### Cursos

- **POST** `/courses` - Criar um novo curso
- **GET** `/courses` - Listar todos os cursos
- **GET** `/courses/:id` - Obter curso por ID

### Documentação da API

- **GET** `/docs` - Interface Swagger UI (apenas em desenvolvimento)

## 🔄 Fluxo da Aplicação

```mermaid
graph TD
    A[Cliente] --> B[Fastify Server]
    B --> C{Validação com Zod}
    C -->|Dados Válidos| D[Processar Requisição]
    C -->|Dados Inválidos| E[Erro 400 - Bad Request]
    
    D --> F{Operação}
    F -->|POST /courses| G[Criar Curso]
    F -->|GET /courses| H[Listar Cursos]
    F -->|GET /courses/:id| I[Buscar Curso por ID]
    
    G --> J[Validar Dados]
    J -->|Sucesso| K[Salvar no PostgreSQL]
    J -->|Falha| L[Erro de Validação]
    
    H --> M[Consultar Banco]
    I --> N[Buscar por ID]
    
    K --> O[Resposta 201 - Created]
    M --> P[Resposta 200 - OK]
    N --> Q{Curso Encontrado?}
    Q -->|Sim| R[Resposta 200 - OK]
    Q -->|Não| S[Erro 404 - Not Found]
    
    L --> T[Resposta 400 - Bad Request]
    
    O --> U[Cliente]
    P --> U
    R --> U
    S --> U
    T --> U
    E --> U
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style C fill:#fff3e0
    style D fill:#e8f5e8
    style F fill:#e3f2fd
    style K fill:#e8f5e8
    style M fill:#e8f5e8
    style N fill:#e8f5e8
    style U fill:#e1f5fe
```

## 🗄️ Banco de Dados

### Comandos úteis

```bash
# Gerar migrações
npm run db:generate

# Executar migrações
npm run db:migrate

# Abrir Drizzle Studio
npm run db:studio
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento com hot reload
- `npm run db:generate` - Gera arquivos de migração
- `npm run db:migrate` - Executa migrações no banco
- `npm run db:studio` - Abre interface visual do Drizzle
- `npm run docker:init` - Inicia containers Docker

## 🌍 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
NODE_ENV=development
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
```

## 📖 Estrutura do Projeto

```
├── server.ts              # Arquivo principal do servidor
├── routes/                # Rotas da API
│   ├── create-course.ts   # Rota para criar cursos
│   ├── get-courses.ts     # Rota para listar cursos
│   └── get-course-by-id.ts # Rota para obter curso específico
├── package.json           # Dependências e scripts
└── README.md             # Este arquivo
```

## 🧪 Desenvolvimento

### Logs
A aplicação utiliza Pino para logging com formatação bonita em desenvolvimento.

### Validação
Todos os dados de entrada são validados usando Zod, garantindo type safety e validação em runtime.

### Documentação
A documentação da API é gerada automaticamente usando Swagger/OpenAPI e está disponível em `/docs` durante o desenvolvimento.

## 📝 Licença

Este projeto está sob a licença ISC.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ usando Fastify, TypeScript e Zod**
