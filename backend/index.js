// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importa as bibliotecas necessárias
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

// Configuração da Conexão com o Banco de Dados 
const pool = new Pool({
    user: process.env.DB_USER,
    host: 'db', 
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

const app = express();
app.use(cors());

const PORT = 4001;

// Funcionalidade  de sugestões de busca
app.get('/suggestions', async (req, res) => {
    const { term } = req.query;

    if (!term) {
        return res.json([]);
    }

    try {
        // Query SQL ordenando por relevância
        const searchQuery = `
            SELECT term,
              CASE
                WHEN term ILIKE $1 THEN 1 -- Prioridade 1: Termo exato (case-insensitive)
                WHEN term ILIKE $2 THEN 2 -- Prioridade 2: Começa com o termo digitado
                WHEN term ILIKE $3 THEN 3 -- Prioridade 3: Contém a palavra que começa com o termo
                ELSE 4                    -- Prioridade 4: Contém o termo em qualquer lugar (substring)
              END as relevance_score
            FROM suggestions
            WHERE term ILIKE $4
            ORDER BY
              relevance_score ASC, -- Ordena pela nossa "nota" de relevância
              length(term) ASC,    -- Como critério de desempate, o mais curto vem primeiro
              term ASC             -- Por último, ordena alfabeticamente
            LIMIT 20;
        `;
        
        // Padrões de busca para cada nível de relevância
        const values = [
            term,           
            term + '%',    
            '% ' + term + '%', 
            '%' + term + '%'
        ];

        const result = await pool.query(searchQuery, values);
        
        const suggestionList = result.rows.map(row => row.term);
        
        res.json(suggestionList);

    } catch (error) {
        console.error('Erro na consulta ao banco de dados:', error);
        res.status(500).json({ message: 'Erro ao buscar sugestões.' });
    }
});

// Coloca o servidor para rodar e escutar na porta definida.
app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
});