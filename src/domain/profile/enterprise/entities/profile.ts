import { Optional } from 'src/core/entities/optional';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Entity } from 'src/core/entity';
import { AddressProps } from './address';

export type ProfileProps = {
  name: string;
  email: string;
  cellphone: string;
  phone?: string;
  cnpj: string;
  cpf: string;
  profileType: string;
  acceptTerms: boolean;
  addressId?: string;
  address: AddressProps;
  createdAt?: Date;
};

export class Profile extends Entity<ProfileProps> {
  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get cellphone(): string {
    return this.props.cellphone;
  }

  set cellphone(cellphone: string) {
    this.props.cellphone = cellphone;
  }

  get phone(): string {
    return this.props.phone;
  }

  set phone(phone: string) {
    this.props.phone = phone;
  }

  get cnpj(): string {
    return this.props.cnpj;
  }

  set cnpj(cnpj: string) {
    this.props.cnpj = cnpj;
  }

  get cpf(): string {
    return this.props.cpf;
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  get profileType(): string {
    return this.props.profileType;
  }

  set profileType(profileType: string) {
    this.props.profileType = profileType;
  }

  get acceptTerms(): boolean {
    return this.props.acceptTerms;
  }

  set acceptTerms(acceptTerms: boolean) {
    this.props.acceptTerms = acceptTerms;
  }

  get addressId(): string {
    return this.props.addressId;
  }

  set addressId(addressId: string) {
    this.props.addressId = addressId;
  }

  get address() {
    return this.props.address;
  }

  static create(
    props: Optional<ProfileProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const profile = new Profile(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );

    return profile;
  }
}
