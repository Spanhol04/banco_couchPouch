
# Configuração de Ambiente: CouchDB, Node.js, e PouchDB

Este projeto utiliza CouchDB, Node.js, e PouchDB para sincronização de banco de dados entre um servidor local e um servidor CouchDB.

## Requisitos
- **Windows**: Sistema operacional para instalação dos softwares
- **CouchDB**: Banco de dados NoSQL, compatível com replicação de dados para o PouchDB
- **Node.js**: Plataforma JavaScript para execução do servidor local
- **PouchDB**: Biblioteca JavaScript que funciona como banco de dados NoSQL no cliente

## Passos de Instalação

### 1. Instalação do CouchDB no Windows
1. Baixe o [Apache CouchDB para Windows](https://couchdb.apache.org/#download).
2. Durante a instalação:
   - Selecione as opções padrão.
   - **Defina o usuário e senha** para o administrador. Por exemplo:
     - **Usuário**: `cwi`
     - **Senha**: `cwi`
3. Após a instalação, acesse o CouchDB local em: [http://localhost:5984/_utils/](http://localhost:5984/_utils/)
4. Certifique-se de que o CouchDB está em execução.

### 2. Instalação do Node.js
1. Baixe e instale o [Node.js](https://nodejs.org/).
2. Confirme a instalação do Node.js executando o seguinte comando no terminal:
   ```bash
   node -v
   ```
   O comando deve exibir a versão do Node.js instalada.

### 3. Instalação do PouchDB
1. Baixe o PouchDB diretamente do repositório oficial no GitHub. Você pode fazer isso executando o seguinte comando no terminal:
   ```bash
   npm install pouchdb
   ```
   Ou, se você baixou manualmente, certifique-se de que os arquivos estão na pasta correta do projeto:
   ```
   C:\CWI\Clientes\Santander\pouchdb
   ```

### 4. Código para Criação e Envio de um Banco de Dados Local para o CouchDB

Este código cria um banco de dados no PouchDB local e o envia para o servidor CouchDB. Também permite testar diferentes quantidades de documentos para verificar a performance.

```javascript
const PouchDB = require('pouchdb');
const dbLocal = new PouchDB('local_db');

// Configuração do CouchDB remoto
const dbRemote = new PouchDB('http://cwi:cwi@localhost:5984/remote_db');

// Função para enviar dados do banco local para o CouchDB remoto
async function syncDatabase(numDocs) {
  // Criando documentos de teste no banco local
  for (let i = 0; i < numDocs; i++) {
    await dbLocal.put({
      _id: `doc_${i}`,
      title: `Documento ${i}`,
      content: `Conteúdo do documento ${i}`
    });
  }

  // Sincronizando com o CouchDB remoto
  dbLocal.replicate.to(dbRemote).on('complete', () => {
    console.log(`Sincronização concluída. ${numDocs} documentos enviados.`);
  }).on('error', (err) => {
    console.error('Erro ao sincronizar:', err);
  });
}

// Teste: Configurando a quantidade de linhas (número de documentos)
syncDatabase(10);  // Altere o número 10 para a quantidade de documentos desejada
```

### 5. Código para Baixar Arquivo de Banco de Dados do CouchDB para o PouchDB Local

O código abaixo permite que você faça o download dos dados do CouchDB remoto para o PouchDB local.

```javascript
const PouchDB = require('pouchdb');
const dbLocal = new PouchDB('local_db');
const dbRemote = new PouchDB('http://cwi:cwi@localhost:5984/remote_db');

// Função para replicar dados do CouchDB remoto para o PouchDB local
async function downloadDatabase() {
  dbRemote.replicate.to(dbLocal).on('complete', () => {
    console.log('Download do banco de dados concluído.');
  }).on('error', (err) => {
    console.error('Erro ao baixar o banco de dados:', err);
  });
}

// Executa o download
downloadDatabase();
```

## Imagem de Exemplo da Sincronização
![Exemplo de Sincronização](path-to-image.png)

## Observações
- **Testes de Performance**: É possível alterar o número de linhas (documentos) no banco de dados local antes de sincronizá-lo com o CouchDB remoto. Isso pode ser útil para testes de carga e performance.
- **Configurações Personalizadas**: Você pode ajustar a URL e as credenciais do CouchDB conforme necessário para o seu ambiente de desenvolvimento.

## Contato
Para mais informações ou dúvidas, entre em contato.

---

Essa estrutura ajuda a guiar os usuários pelas etapas de instalação, configuração e teste, com explicações claras e exemplos práticos.
