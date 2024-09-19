const PouchDB = require('pouchdb');
const db = new PouchDB('dados_pessoas');

db.allDocs({ include_docs: true }).then(function (result) {
  result.rows.forEach(row => {
    console.log('Documento:', row.doc);
  });
}).catch(function (err) {
  console.error('Erro ao consultar:', err);
});
