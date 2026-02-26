import type { FastifyRequest, FastifyReply } from 'fastify';

import { authenticateBodySchema } from '../schemas/users-schemas';
import { UsersRepository } from '../../repositories/users-repository';
import { AuthenticateUseCase } from '../../use-cases/authenticate';

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const usersRepository = new UsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    );

    return reply.status(200).send({
      token,
    });
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(401).send({ message: err.message });
    }

    throw err;
  }
}
