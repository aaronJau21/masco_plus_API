import { Module } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { MarcaController } from './marca.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';

@Module({
  controllers: [MarcaController],
  providers: [MarcaService],
  imports: [
    PrismaModule,
    MulterModule.register({
      storage: multer.memoryStorage(),
    }),
  ],
})
export class MarcaModule {}
