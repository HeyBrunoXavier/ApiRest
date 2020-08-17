# Api de Games
Criação de uma API para estudos e adquirir conhecimentos novos, como manipulação e autenticão JWT.
## EndPoints
### GET /games
Esse endpoint é responsável por retornar a listagem de todos os games cadastrados no banco de dados.
#### Parameters
Nenhum
#### Responses
##### OK! 200
Caso esta reposta aconteça o usuário recebe a listagem do Games.

Exemplo de resposta:
```
{
    "empresa": "SRNSolutions",
    "user": {
        "id": 10,
        "email": "brunoxavier@desenvolv.com"
    },
    "games": [
        {
            "id": 23,
            "title": "Call of duty MW",
            "year": 2019,
            "price": 60
        },
        {
            "id": 12,
            "title": "Sea of thieves",
            "year": 2018,
            "price": 40
        },
        {
            "id": 1,
            "title": "Minecraft",
            "year": 2012,
            "price": 30
        }
    ]
}
```
##### Falha na  autenticação! 401
Caso esta resposta aconteça, significa que aconteceu alguma falha durante o processo de autenticação da requisilção. Motivos: Token inválido, Token expirado.

Exemplo de resposta:

```
{
  "err": "Token inválido"
}
```
### POST /auth
Esse endpoint é responsável por fazer o processo de login.
#### Parameters
email: E-mail do usuário cadastrado no sistema.

password: Senha do usuário cadastrado no sistema.

Exemplo de resposta:

```
{
    "email":"brunoxavier@desenvolv.com",
    "password":"desenvolv"
}
```
#### Responses
##### OK! 200
Caso esta reposta aconteça o usuário recebe o token JWT para conseguir acessar endpoints protegidos.

Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiYnJ1bm94YXZpZXJAZGVzZW52b2x2LmNvbSIsImlhdCI6MTU5NzY5NTQ2OCwiZXhwIjoxNTk3ODY4MjY4fQ.0933Q_oYB2sC9ynDWV3XFEo9sjNvvAVFBlX4bC2HSq0"
}
```
##### Falha na  autenticação! 401
Caso esta resposta aconteça, significa que aconteceu alguma falha durante o processo de autenticação da requisilção. Motivos: Senha ou email incorretos.

Exemplo de resposta:

```
{
  "err": "Credênciais inválida"
}
```
