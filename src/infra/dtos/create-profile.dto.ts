import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { IsCpfCnpj } from 'src/core/decorators/cpf-cnpj.decorator';

const profile_type = ['PF', 'PJ'];

class CreateAddressDto {
  @ApiProperty({
    description: 'Cep do endereço',
    example: '15115-000',
  })
  @IsString({ message: 'O campo zipcode deve ser do tipo string' })
  @IsNotEmpty({ message: 'O campo zipcode é obrigatório' })
  @Transform(({ value }) => value.replace(/\D/g, ''))
  zipcode: string;

  @ApiProperty({
    description: 'Logradouro do endereço',
    example: 'Rua Neusa Peres',
  })
  @IsString({ message: 'O campo street deve ser do tipo string' })
  @IsNotEmpty({ message: 'O campo street é obrigatório' })
  street: string;

  @ApiProperty({
    description: 'Número do endereço',
    example: '34',
  })
  @IsString({ message: 'O campo number deve ser do tipo string' })
  @IsNotEmpty({ message: 'O campo number é obrigatório' })
  number: string;

  @ApiPropertyOptional({
    description: 'Complemento do endereço',
    example: 'Casa',
    required: false,
  })
  @IsString({ message: 'O campo complement deve ser do tipo string' })
  @IsOptional()
  complement?: string;

  @ApiProperty({
    description: 'Cidade do endereço',
    example: 'Bady Bassitt',
  })
  @IsString({ message: 'O campo city deve ser do tipo string' })
  @IsNotEmpty({ message: 'O campo city é obrigatório' })
  city: string;

  @ApiProperty({
    description: 'Bairro do endereço',
    example: 'Jardim California',
  })
  @IsString({ message: 'O campo neighborhood deve ser do tipo string' })
  @IsNotEmpty({ message: 'O campo neighborhood é obrigatório' })
  neighborhood: string;

  @ApiProperty({
    description: 'Estado do endereço',
    example: 'São Paulo',
  })
  @IsString({ message: 'O campo state deve ser do tipo string' })
  @IsNotEmpty({ message: 'O campo state é obrigatório' })
  state: string;
}

export class CreateProfileDto {
  @ApiProperty({
    description: 'Tipo de cadastro de pessoa',
    example: 'PJ',
    enum: profile_type,
  })
  @IsEnum(profile_type, {
    message: 'O campo profile_type deve ser PJ ou PF',
  })
  @IsNotEmpty({ message: 'O campo profile_type é obrigatório' })
  profileType: string;

  @ApiProperty({
    description: 'Número de identificação da empresa (CNPJ)',
    example: '11.123.345/0001-99',
  })
  @IsString({ message: 'O campo cnpj deve ser do tipo string' })
  @IsNotEmpty({ message: 'O campo cnpj é obrigatório' })
  @IsCpfCnpj({ message: 'O campo cnpj precisa ser um CNPJ válido' })
  cnpj: string;

  @ApiProperty({
    description: 'Número de identificação da pessoa (CPF)',
    example: '000.111.222-33',
  })
  @IsString({ message: 'O campo cpf deve ser do tipo string' })
  @IsNotEmpty({ message: 'O campo cpf é obrigatório' })
  @IsCpfCnpj({ message: 'O campo cpf precisa ser um CPF válido' })
  cpf: string;

  @ApiProperty({
    description: 'Nome do vendedor ou comprador que está sendo cadastrado',
    example: 'Arlan Biati',
  })
  @IsString({ message: 'O campo name deve ser do tipo string' })
  @IsNotEmpty({ message: 'O campo name é obrigatório' })
  name: string;

  @ApiProperty({
    description: 'Celular do vendedor ou comprador que está sendo cadastrado',
    example: '991232222',
  })
  @IsString({ message: 'O campo cellphone deve ser do tipo string' })
  @IsNotEmpty({ message: 'O campo cellphone é obrigatório' })
  @Length(9, 9, {
    message: 'O campo cellphone deve conter exatamente 9 dígitos',
  })
  @Transform(({ value }) => value.replace(/\D/g, ''))
  cellphone: string;

  @ApiPropertyOptional({
    description: 'Telefone do vendedor ou comprador que está sendo cadastrado',
    example: '32581598',
    required: false,
  })
  @IsString({ message: 'O campo phone deve ser do tipo string' })
  @Length(8, 8, {
    message: 'O campo phone deve conter exatamente 8 dígitos',
  })
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @IsOptional()
  phone?: string;

  @ApiProperty({
    description: 'Email do vendedor ou comprador que está sendo cadastrado',
    example: 'johndoe@example.com',
  })
  @IsString({ message: 'O campo email deve ser do tipo string' })
  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  @IsEmail(
    {},
    { message: 'O campo email deve ser um endereço de e-mail válido' },
  )
  email: string;

  @ApiProperty({
    description: 'Aceite dos termos de uso',
    example: true,
  })
  @IsBoolean({ message: 'O campo accept_terms deve ser do tipo boolean' })
  @IsNotEmpty({ message: 'O campo accept_terms é obrigatório' })
  acceptTerms: boolean;

  @ApiProperty({
    description: 'Endereço do perfil',
    type: CreateAddressDto,
  })
  @ValidateNested()
  @IsNotEmpty({ message: 'O objeto address é obrigatório' })
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
