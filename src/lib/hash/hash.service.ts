import { Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class HashService {
  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
