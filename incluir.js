const PouchDB = require('pouchdb');
const db = new PouchDB('dados_pessoas');

const pessoas = [
  { _id: '001', nome: 'Ana', idade: 25, peso: 65 },
  { _id: '002', nome: 'Bruno', idade: 30, peso: 78 },
  { _id: '003', nome: 'Carla', idade: 28, peso: 58 },
  { _id: '004', nome: 'Daniel', idade: 35, peso: 85 },
  { _id: '005', nome: 'Eva', idade: 22, peso: 50 }
];

pessoas.forEach(pessoa => {
  db.put(pessoa).then(function (response) {
    console.log('Documento inserido:', response);
  }).catch(function (err) {
    console.error('Erro ao inserir:', err);
  });
});