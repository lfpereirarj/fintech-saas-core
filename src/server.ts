import fastify from 'fastify';
import { registerUserController } from './http/controllers/register-user-controller';

const app = fastify({ logger: true });

app.post('/users', registerUserController);

app.listen({ port: 3333 }).then(() => {
  console.log('🚀 Servidor rodando em http://localhost:3333');
});
