import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Pagination } from 'src/core/repositories/pagination.repository';
import { FindAllProfileUseCase } from 'src/domain/profile/application/use-cases/find-all-profile';
import { ProfilePresenter } from '../presenters/profile.presenter';

@Controller('profile')
@ApiTags('Profile')
export class FindAllProfileController {
  constructor(private readonly findAllProfile: FindAllProfileUseCase) {}

  @Get()
  @ApiOperation({
    summary: 'Profile - GET',
    description: 'Busca de todos os perfis',
  })
  @ApiQuery({ name: 'page', type: 'number', example: 1 })
  @ApiQuery({ name: 'perPage', type: 'number', example: 10 })
  @ApiCreatedResponse({ description: 'Busca realizada com sucesso' })
  async findAll(@Query() pagination: Pagination) {
    const result = await this.findAllProfile.execute({
      pagination,
    });
    return {
      profiles: result.value.profiles.map((profile) =>
        ProfilePresenter.toHttp(profile),
      ),
      total: result.value.total,
    };
  }
}
