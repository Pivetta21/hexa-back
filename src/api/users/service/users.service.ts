import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../../repositories/user.repository';
import { UserDto } from './../model/user.dto';
import { CreateUserDto } from '../model/create-user.dto';
import { UpdateUserDto } from '../model/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto): Promise<UserDto> {
    const newUser = this.userRepository.create(createUserDto);

    return this.userRepository.save(newUser);
  }

  findAll(name?: string): Promise<UserDto[]> {
    if (name) {
      return this.userRepository.find({ where: { name } });
    }

    return this.userRepository.find({ order: { id: 'ASC' } });
  }

  findOne(id: number): Promise<UserDto> {
    return this.userRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return this.userRepository.save({ user, ...updateUserDto });
  }

  remove(id: number): Promise<UserDto> {
    const user = this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    this.userRepository.delete(id);

    return user;
  }
}
