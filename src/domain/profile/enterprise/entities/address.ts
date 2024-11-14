import { Optional } from 'src/core/entities/optional';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Entity } from 'src/core/entity';

export type AddressProps = {
  zipcode: string;
  street: string;
  number: string;
  complement?: string;
  city: string;
  neighborhood: string;
  state: string;
  createdAt?: Date;
};

export class Address extends Entity<AddressProps> {
  get zipcode(): string {
    return this.props.zipcode;
  }

  set zipcode(zipcode: string) {
    this.props.zipcode = zipcode;
  }

  get street(): string {
    return this.props.street;
  }

  set street(street: string) {
    this.props.street = street;
  }

  get number(): string {
    return this.props.number;
  }

  set number(number: string) {
    this.props.number = number;
  }

  get complement(): string {
    return this.props.complement;
  }

  set complement(complement: string) {
    this.props.complement = complement;
  }

  get city(): string {
    return this.props.city;
  }

  set city(city: string) {
    this.props.city = city;
  }

  get neighborhood(): string {
    return this.props.neighborhood;
  }

  set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood;
  }

  get state(): string {
    return this.props.state;
  }

  set state(state: string) {
    this.props.state = state;
  }

  static create(
    props: Optional<AddressProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const address = new Address(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );

    return address;
  }
}
