import { compare } from 'bcryptjs';
import { UsersRepository } from '../repositories/users-repository';

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ email, password }: AuthenticateUseCaseRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('E-mail ou senha incorretos.');
    }

    const doesPasswordMatch = await compare(password, user.password_hash);

    if (!doesPasswordMatch) {
      throw new Error('E-mail ou senha incorretos.');
    }

    return { user };
  }
}
