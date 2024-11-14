import { Either, left, right } from 'src/core/either';
import { ProfileAlreadyExists } from './errors/profile-already-exists';
import { Profile } from '../../enterprise/entities/profile';
import { Injectable } from '@nestjs/common';
import { ProfileRepository } from '../repositories/profile.repository';
import { AddressRepository } from '../repositories/address.repository';
import { Address } from '../../enterprise/entities/address';

type CreateAddressUseCaseRequest = {
  zipcode: string;
  street: string;
  number: string;
  complement?: string;
  city: string;
  neighborhood: string;
  state: string;
};

type CreateProfileUseCaseRequest = {
  name: string;
  email: string;
  cellphone: string;
  phone?: string;
  cnpj: string;
  cpf: string;
  profileType: string;
  acceptTerms: boolean;
  addressId?: string;

  address: CreateAddressUseCaseRequest;
};

type DataCreateProfileUseCaseRequest = {
  data: CreateProfileUseCaseRequest;
};

type CreateProfileUseCaseResponse = Either<
  ProfileAlreadyExists,
  { profile: Profile }
>;

@Injectable()
export class CreateProfileUseCase {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly addressRepository: AddressRepository,
  ) {}

  async execute({
    data,
  }: DataCreateProfileUseCaseRequest): Promise<CreateProfileUseCaseResponse> {
    const profileExist = await this.profileRepository.findByEmail(data.email);

    if (profileExist) return left(new ProfileAlreadyExists(data.email));

    const address = Address.create(data.address);

    const addressCreated = await this.addressRepository.create(address);

    const profile = Profile.create({
      ...data,
      addressId: addressCreated.id.toString(),
    });

    const profileCreated = await this.profileRepository.create(profile);

    return right({ profile: profileCreated });
  }
}
