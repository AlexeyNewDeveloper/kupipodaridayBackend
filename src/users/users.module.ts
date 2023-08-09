import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HashModule } from 'src/hash/hash.module';
import { HashService } from 'src/hash/hash.service';

@Module({
  imports: [HashModule],
  controllers: [UsersController],
  providers: [UsersService, HashService],
  exports: [UsersService]
})
export class UsersModule { }
