import { z } from 'zod';

export const registerUserSchema = z.object({
  name: z.string().min(2, 'O nome precisa ter pelo menos 2 caracteres.'),
  email: z.string().email('Formato de e-mail inválido.'),
  password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres.'),
});

export const authenticateBodySchema = z.object({
  email: z.string().email('Formato de e-mail inválido.'),
  password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres.'),
});
