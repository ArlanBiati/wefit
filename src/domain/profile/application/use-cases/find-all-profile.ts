import { Either, right } from 'src/core/either';
import { Pagination } from 'src/core/repositories/pagination.repository';
import { Profile } from '../../enterprise/entities/profile';
import { Injectable } from '@nestjs/common';
import { ProfileRepository } from '../repositories/profile.repository';

type FindAllProfileUseCaseRequest = {
  pagination?: Pagination;
};

type FindAllProfileUseCaseResponse = Either<
  null,
  { profiles: Profile[]; total: number }
>;

@Injectable()
export class FindAllProfileUseCase {
  constructor(private profileRepository: ProfileRepository) {}

  async execute({
    pagination,
  }: FindAllProfileUseCaseRequest): Promise<FindAllProfileUseCaseResponse> {
    const { profiles, total } =
      await this.profileRepository.findAll(pagination);

    return right({ profiles, total });
  }
}
