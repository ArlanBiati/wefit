import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateProfileController } from './controller/create-profile.controller';
import { FindAllProfileController } from './controller/find-all-profile.controller';
import { CreateProfileUseCase } from 'src/domain/profile/application/use-cases/create-profile';
import { FindAllProfileUseCase } from 'src/domain/profile/application/use-cases/find-all-profile';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateProfileController, FindAllProfileController],
  providers: [CreateProfileUseCase, FindAllProfileUseCase],
})
export class HttpModule {}
