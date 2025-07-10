import { ApolloServer } from '@apollo/server';
import axios from 'axios';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';

// Define o schema do GraphQL, especificando as queries e tipos de dados disponíveis.
const typeDefs = `#graphql
  type Query {
    getSuggestions(term: String!): [String]
  }
`;

// Implementa a lógica para resolver as queries definidas no schema.
const resolvers = {
  Query: {
    getSuggestions: async (_, { term }) => {
      try {
        // Faz uma chamada para o serviço de backend para obter os dados das sugestões.
        const response = await axios.get(`http://backend:4001/suggestions?term=${term}`);
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar sugestões do backend:", error.message);
        return []; // Retorna um array vazio em caso de erro.
      }
    },
  },
};

// Configura o servidor Express e o servidor Apollo.
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Inicia o servidor Apollo antes de aplicar o middleware.
await server.start();

// Aplica os middlewares ao Express, incluindo CORS, parser de JSON e o próprio Apollo Server.
app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server),
);

// Inicia o servidor HTTP e o expõe na porta 4000.
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Servidor GraphQL pronto em: http://localhost:4000/graphql`);