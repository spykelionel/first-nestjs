import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import TodoModule from '../todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Todo } from '../todo/data/todo.entity';
import { UserModule } from '../user/user.module';
import { User } from '../user/data/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'todo',
      entities: [Todo, User],
      synchronize: true,
    }),
    TodoModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}
}
