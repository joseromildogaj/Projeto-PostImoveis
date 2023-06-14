# Projeto PostImoveis

### Sobre
```sh
- Criação de um CRUD para o gerenciamento de corretores de imóveis
```
### Tecnologias
    - Node.js
    - Express
    - React-Native
    - Expo
    - MongoDB

### Passos para Executar o Projeto

  1 - Clone esse projeto para sua máquina e abra em sua IDE favorita
  2 - Abra dois terminais
  3 - Em um dos terminais acesse o diretório Backend e execute o comando para baixar as dependências: npm install ou yarn install
  4 - Execute o comando para "subir" o servidor: npm run dev
  5 - No segundo terminal acesse o diretório Frontend e execute o comando para baixar as dependências: npm install ou yarn install
  6 - Instalar o aplicativo Expo Go no smartphone
  7 - Abrir o aplicativo e scanear o QRCODE

### Requisições
```sh
# Retorna todos os corretores
  http://localhost:3000/corretores

# Retorna um corretor pelo id ( Exemplo: id = 64896d875ac36c8f71d422e4 )
  http://localhost:3000/corretores/64896d875ac36c8f71d422e4

# Salva um corretor
  http://localhost:3000/corretores

# Atualiza um corretor ( Exemplo: id = 6483d8ca0b2c530c2e02cce1 )
  http://localhost:3000/corretores/6483d8ca0b2c530c2e02cce1

# Remove um corretor ( Exemplo: id = 64896d875ac36c8f71d422e4 )
  http://localhost:3000/corretores

  {
    "id": "64896d875ac36c8f71d422e4"
  }
```
