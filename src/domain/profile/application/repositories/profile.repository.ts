import { Pagination } from 'src/core/repositories/pagination.repository';
import { Profile } from '../../enterprise/entities/profile';

export abstract class ProfileRepository {
  abstract findAll(
    pagination?: Pagination,
  ): Promise<{ profiles: Profile[]; total: number }>;

  abstract findByEmail(email: string): Promise<Profile | null>;

  abstract create(profile: Profile): Promise<Profile>;
}
