import { Transform } from 'class-transformer';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cpf, cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint({ async: false })
class IsCpfCnpjConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    const sanitizedValue = value.replace(/\D/g, '');

    return cpf.isValid(sanitizedValue) || cnpj.isValid(sanitizedValue);
  }

  defaultMessage() {
    return 'O valor informado não é um CPF ou CNPJ válido';
  }
}

export function IsCpfCnpj(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    Transform(({ value }) => value.replace(/\D/g, ''))(object, propertyName);

    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCpfCnpjConstraint,
    });
  };
}
