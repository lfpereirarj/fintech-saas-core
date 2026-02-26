import bcrypt from 'bcryptjs';
import { UsersRepository } from '../repositories/users-repository';

interface RegisterUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUserUseCaseRequest) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error('Este e-mail já está em uso.');
    }

    const password_hash = await bcrypt.hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return { user };
  }
}
