import type { FastifyRequest, FastifyReply } from 'fastify';

import { registerUserSchema } from '../schemas/users-schemas';
import { UsersRepository } from '../../repositories/users-repository';
import { RegisterUserUseCase } from '../../use-cases/register-user';

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, email, password } = registerUserSchema.parse(request.body);

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
