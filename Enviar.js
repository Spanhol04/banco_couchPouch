const PouchDB = require('pouchdb');
const { randomBytes } = require('crypto');

// Função para gerar um nome aleatório
function generateRandomName() {
  return randomBytes(10).toString('hex');
}

// Função para gerar um número aleatório entre um mínimo e um máximo
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Conectar ao CouchDB local
const remoteCouch = new PouchDB('http://localhost:5984/seu_banco5', {
  auth: {
    username: 'cwi',
    password: 'cwi'
  }
});

// Criar um banco de dados local (PouchDB)
const localDB = new PouchDB('meu_banco_local5');

const fs = require('fs');
// Lendo a imagem e convertendo para Base64
const imgData = fs.readFileSync('C:\\CWI\\Clientes\\Santander\\pouchdb\\Projeto\\a\\cwi 3.JFIF');
const base64Image = imgData.toString('base64');

// Gerar uma lista de pessoas aleatórias
const pessoas = [];
for (let i = 0; i < 100000; i++) {
  pessoas.push({
    _id: `pessoa_${i}`,
    nome: generateRandomName(),
    idade: getRandomInt(18, 65),
    peso: getRandomInt(50, 120),
    imagem: `data:image/jpeg;base64,${base64Image}`
  });
}

// Inserir as pessoas no banco local
async function insertPessoas(pessoas) {
  try {
    const results = await localDB.bulkDocs(pessoas);
   // console.log('Documentos inseridos:', results);
  } catch (err) {
    console.error('Erro ao inserir pessoas:', err);
  }
}

// Função para sincronizar os bancos
function sync() {
  // Sincronizar as mudanças do banco local para o remoto
  localDB.replicate.to(remoteCouch, {retry: true })
    .on('complete', () => {
      console.log('Sincronização completa!');
      console.log("fim da sincronização");
      const endTime = new Date();
      console.log(endTime);
    })
    .on('error', (err) => {
      console.error('Erro na sincronização:', err);
    });

  // Sincronizar as mudanças do banco remoto para o local
//  remoteCouch.replicate.to(localDB, {retry: true })
//    .on('complete', () => {
//      console.log('Sincronização completa!');
//    })
//    .on('error', (err) => {
//      console.error('Erro na sincronização:', err);
//    });
}

// Chamar as funções
insertPessoas(pessoas)
  .then(() => {
    console.log('Inserção concluída. Iniciando sincronização...');
    console.log("Início da sincronização");
    const startTime = new Date();
    console.log(startTime);    
    sync();
  })
  .catch(err => console.error(err));



