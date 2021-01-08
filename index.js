const server = require('./config/server');
const { createTables } = require('./config/database');

createTables();
const app = server();
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
