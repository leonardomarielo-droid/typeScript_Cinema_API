# Cinema API (TypeScript + Express + MySQL)

API REST adaptada ao banco `Cinema` definido em `BancoLuaiz.sql`. A organização em camadas do projeto original foi preservada: `controllers`, `dao`, `database`, `http`, `logging`, `middlewares`, `models`, `routers` e `services`.

## Requisitos
- Node.js 20+ (recomendado)
- MySQL 8+

## Configuração
1. Importe `BancoLuaiz.sql` no MySQL (o script recria o banco `Cinema`).
2. Configure o arquivo `.env` com host, porta, usuário e senha do MySQL.
3. Instale dependências: `npm install`.
4. Execute em desenvolvimento: `npm run dev` (ou `npx nodemon`).
5. Para compilar: `npm run build`; para executar: `npm start`.

A API inicia por padrão em `http://localhost:3000`.

## Endpoints
| Método | Rota | Acesso | Corpo / finalidade |
|---|---|---|---|
| POST | `/api/usuarios` | público | `{ "usuario": {"Usuario_nome":"Nome", "Usuario_email":"email", "Usuario_senha":"senha"} }` cadastro |
| POST | `/api/usuarios/login` | público | mesmo envelope; email e senha para login |
| GET | `/api/usuarios` | JWT | lista usuários sem senhas |
| GET | `/api/usuarios/:id` | JWT | consulta usuário |
| PUT | `/api/usuarios/:id` | JWT | atualiza a própria conta |
| DELETE | `/api/usuarios/:id` | JWT | exclui a própria conta |
| GET | `/api/filmes` | público | lista filmes |
| GET | `/api/filmes/:id` | público | consulta filme |
| POST | `/api/filmes` | JWT | `{ "filme": {"Filme_titulo":"Título", "Filme_duracao":120} }` |
| PUT | `/api/filmes/:id` | JWT | atualiza filme |
| DELETE | `/api/filmes/:id` | JWT | exclui filme |
| GET | `/api/avaliacoes` | público | lista; filtros opcionais `?filme=1&usuario=1` |
| GET | `/api/avaliacoes/:id` | público | consulta avaliação |
| POST | `/api/avaliacoes` | JWT | `{ "avaliacao": {"Avaliacoes_nota":8, "Avaliacoes_mensagem":"Bom", "Avaliacoes_filme":1} }` |
| PUT | `/api/avaliacoes/:id` | JWT | altera avaliação própria; envelope `avaliacao` |
| DELETE | `/api/avaliacoes/:id` | JWT | exclui avaliação própria |

Envie o token recebido no login no cabeçalho `Authorization: Bearer <token>`. A nota aceita valores de 0 a 10. A senha é armazenada com bcrypt. As FKs do banco impedem excluir usuários/filmes que ainda possuam avaliações associadas.

## Observações de segurança
O schema fornecido não contém coluna de perfil/administrador; por isso, não foi inventada uma hierarquia de permissões. Neste projeto, operações de escrita de filmes exigem autenticação JWT. Para restringi-las a administradores, será necessário acrescentar uma coluna de perfil ao banco. Defina um `JWT_SECRET` forte antes de publicar.
