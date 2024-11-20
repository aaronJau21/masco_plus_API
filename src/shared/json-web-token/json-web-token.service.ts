import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class JsonWebTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async asignIn(name: string, user_name: string, id: number) {
    const payload = { name, user_name, id };
    return await this.jwtService.signAsync(payload);
  }
}
