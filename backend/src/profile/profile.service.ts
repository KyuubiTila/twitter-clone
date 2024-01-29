import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async getProfileById(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { userId: id },
    });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async updateProfile(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const foundProfile = await this.getProfileById(id);

    if (foundProfile) {
      foundProfile.bio = updateProfileDto.bio;
      foundProfile.image = updateProfileDto.image;
      return await this.profileRepository.save(foundProfile);
    }
  }
}
