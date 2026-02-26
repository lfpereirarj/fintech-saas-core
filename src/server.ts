import fastify from 'fastify';

import { z } from 'zod';

import { prisma } from './lib/prisma';

import bcrypt from 'bcryptjs';

const app = fastify({ logger: true });

app.post('/users', async (request, reply) => {
  const createUserSchema = z.object({
    name: z.string().min(2, 'O nome precisa ter pelo menos 2 caracteres.'),
    email: z.string().email('Formato do e-mail inválido'),
    password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres'),
  });

  const { name, email, password } = createUserSchema.parse(request.body);

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    return reply.status(409).send({ message: 'Este e-mail já está em uso' });
  }

  const password_hash = await bcrypt.hash(password, 6);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });

  return reply.status(201).send({
    id: user.id,
    name: user.name,
    email: user.email,
  });
});

app.listen({ port: 3333 }).then(() => {
  console.log('🚀 Servidor rodando em http://localhost:3333');
});
