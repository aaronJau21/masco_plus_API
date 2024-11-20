import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { JsonWebTokenService } from './json-web-token/json-web-token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [HashingService, JsonWebTokenService],
  exports: [HashingService, JsonWebTokenService],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class SharedModule {}
