import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { registerUserController } from './http/controllers/register-user-controller';
import { authenticateController } from './http/controllers/authenticate-controller';

const app = fastify({ logger: true });

app.register(fastifyJwt, {
  secret: 'super-secreta-fintech-saas-nao-partilhar',
});

app.post('/users', registerUserController);
app.post('/sessions', authenticateController);

app.listen({ port: 3333 }).then(() => {
  console.log('🚀 Servidor rodando em http://localhost:3333');
});
