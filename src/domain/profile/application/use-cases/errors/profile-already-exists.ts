import { UseCaseError } from 'src/core/errors/use-case-error';

export class ProfileAlreadyExists extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`O perfil ${identifier} já existe`);
  }
}
