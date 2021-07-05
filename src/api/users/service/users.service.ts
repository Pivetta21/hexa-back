import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
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

  update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }
}
