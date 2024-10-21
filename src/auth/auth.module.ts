import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PrismaModule, SharedModule],
})
export class AuthModule {}
