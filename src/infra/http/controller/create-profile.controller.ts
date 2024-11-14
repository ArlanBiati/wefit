import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProfileUseCase } from 'src/domain/profile/application/use-cases/create-profile';
import { ProfileAlreadyExists } from 'src/domain/profile/application/use-cases/errors/profile-already-exists';
import { CreateProfileDto } from 'src/infra/dtos/create-profile.dto';

@Controller('profile')
@ApiTags('Profile')
export class CreateProfileController {
  constructor(private readonly createProfile: CreateProfileUseCase) {}

  @Post()
  @ApiOperation({
    summary: 'Profile - POST',
    description: 'Cadastro de perfil',
  })
  @ApiCreatedResponse({ description: 'Cadastro efetuado com sucesso' })
  @ApiBadRequestResponse({ description: 'Dados do cadastrado inválidos' })
  async create(@Body() createProfileData: CreateProfileDto) {
    const result = await this.createProfile.execute({
      data: createProfileData,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ProfileAlreadyExists:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    return { message: 'Cadastro efetuado com sucesso' };
  }
}
