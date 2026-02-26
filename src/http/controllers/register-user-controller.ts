import type { FastifyRequest, FastifyReply } from 'fastify';

import { z } from 'zod';
import { UsersRepository } from '../../repositories/users-repository';
import { RegisterUserUseCase } from '../../use-cases/register-user';

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createUserSchema = z.object({
    name: z.string().min(2, 'O nome deve conter no mínimo 2 caracteres.'),
    email: z.string().email('O e-mail deve ser válido.'),
    password: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres.'),
  });

  const { name, email, password } = createUserSchema.parse(request.body);

  try {
    const usersRepository = new UsersRepository();
    const registerUserUseCase = new RegisterUserUseCase(usersRepository);

    const { user } = await registerUserUseCase.execute({
      name,
      email,
      password,
    });

    return reply.status(201).send({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
