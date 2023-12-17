import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { IUserDAO } from './data/user.dao';
import { CreateUserDTO, UpdateUserDTO } from './data/user.dto';
import { User } from './data/user.entity';

@Injectable()
export class UserService implements IUserDAO {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  createUser(createUserDto: CreateUserDTO): Promise<InsertResult> {
    return this.userRepository.insert(createUserDto);
  }

  updateUser(id: number, updateUserDto: UpdateUserDTO): Promise<UpdateResult> {
    return this.userRepository.update(id, updateUserDto);
  }
  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
  getSingleUser(id: number): Promise<User> {
    return this.userRepository.findOneByOrFail({ id });
  }
  deleteSingleUser(id: number): Promise<DeleteResult> {
    return this.userRepository.softDelete({ id });
  }
}
