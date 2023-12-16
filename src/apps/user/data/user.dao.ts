import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { User } from './user.entity';

export interface IUserDAO {
  /**
   * This methods creates a user in the database
   * @param createUserDto The user object to be created
   * @returns Promise of the insert results
   */
  createUser(createUserDto: CreateUserDTO): Promise<InsertResult>;
  updateUser(id: number, updateUserDto: UpdateUserDTO): Promise<UpdateResult>;
  getAllUsers(): Promise<User[]>;
  getSingleUser(id: number): Promise<User>;
  deleteSingleUser(id: number): Promise<DeleteResult>;
}
