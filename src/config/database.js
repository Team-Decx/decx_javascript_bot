const mongoose = require('mongoose');

class Database {
    constructor() {
        this.connection = null;
    }

    connect() {
        const mongo_url = 'XXX';
        console.log('Tentando conexão com banco de dados...');
        mongoose.connect(mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log('Conectado com o banco de dados.');
            this.connect = mongoose.connection;
        }).catch(err => {
            console.error(err);
        });
    }
}

module.exports = Database;