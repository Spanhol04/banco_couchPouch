const PouchDB = require('pouchdb');
const { randomBytes } = require('crypto');

// Conectar ao CouchDB local
const remoteCouch = new PouchDB('http://localhost:5984/seu_banco5', {
    auth: {
        username: 'cwi',
        password: 'cwi'
    }
});

// Criar um banco de dados local (PouchDB)
const localDB = new PouchDB('meu_banco_local5');


// Função para sincronizar os bancos
function sync() {
    // Sincronizar as mudanças do banco remoto para o local
    remoteCouch.replicate.to(localDB, { retry: true })
        .on('complete', () => {
            console.log('Sincronização completa!');
        })
        .on('error', (err) => {
            console.error('Erro na sincronização:', err);
        });
}

// Chamar as funções
console.log("Início da sincronização");
const startTime = new Date();
console.log(startTime);
sync();
const fimTime = new Date();
console.log(fimTime);




