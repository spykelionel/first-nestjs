import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats.module';
import TodoModule from './todo/todo.module';

@Module({
  imports: [CatsModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
