import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { MarcaModule } from './marca/marca.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    SharedModule,
    MarcaModule,
    ConfigModule.forRoot(),
    ProductsModule,
  ],
})
export class AppModule {}
