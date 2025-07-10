const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

// Configura a conexão com o banco, usando as variáveis do .env
const dbConfig = {
    user: process.env.DB_USER || 'user',
    host: 'db', 
    database: process.env.DB_NAME || 'autocomplete',
    password: process.env.DB_PASSWORD || 'password',
    port: 5432,
    charset: 'UTF8', 
};

// Função para ler as sugestões do nosso arquivo JSON local
function readSuggestionsFromFile() {
    const jsonPath = path.resolve(__dirname, 'dados.json');
    console.log(`Lendo sugestões do arquivo: ${jsonPath}`);
    
    try {
        const fileContent = fs.readFileSync(jsonPath, 'utf8');
        const suggestions = JSON.parse(fileContent);
        console.log(`Leitura concluída. ${suggestions.length} sugestões encontradas.`);
        return suggestions;
    } catch (error) {
        console.error("Erro fatal ao ler o arquivo de dados JSON:", error);
        return []; 
    }
}

// Função para inserir os dados no banco
async function populateDatabase(suggestions) {
    if (suggestions.length === 0) {
        console.log('Nenhuma sugestão para popular o banco de dados.');
        return;
    }

    const client = new Client(dbConfig);
    
    try {
        await client.connect();
        console.log('Conectado ao banco de dados com sucesso!');

        // Cria a tabela se ela não existir
        await client.query(`
            CREATE TABLE IF NOT EXISTS suggestions (
                id SERIAL PRIMARY KEY,
                term VARCHAR(1024) NOT NULL UNIQUE
            );
        `);
        console.log('Tabela "suggestions" verificada/criada.');
        
        // Limpa a tabela para garantir que não haja dados antigos
        await client.query('TRUNCATE TABLE suggestions RESTART IDENTITY;');
        console.log('Tabela "suggestions" limpa.');

        // Itera sobre as sugestões e insere cada uma no banco
        console.log(`Inserindo ${suggestions.length} novas sugestões...`);
        for (const term of suggestions) {
            await client.query('INSERT INTO suggestions (term) VALUES ($1) ON CONFLICT (term) DO NOTHING', [term.substring(0, 1024)]);
        }

        console.log('Banco de dados populado com sucesso!');

    } catch (error) {
        console.error('Erro ao popular o banco de dados:', error.message);
    } finally {
        await client.end();
        console.log('Conexão com o banco de dados fechada.');
    }
}

// Função principal que orquestra as tarefas
async function main() {
    const suggestions = readSuggestionsFromFile();
    await populateDatabase(suggestions);
}

main();