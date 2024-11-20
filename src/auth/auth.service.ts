import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTrabajadorDto } from './dtos/createTrabajador.dto';
import { HashingService } from 'src/shared/hashing/hashing.service';
import { ICreateResponse } from 'src/shared/interfaces/create.response';
import { LoginDto } from './dtos/login.dto';
import { JsonWebTokenService } from 'src/shared/json-web-token/json-web-token.service';
import { ILoginResponse } from './interfaces/LoginResponse.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaServe: PrismaService,
    private readonly hashService: HashingService,
    private readonly jsonWebTokenService: JsonWebTokenService,
  ) {}

  async createUser(data: CreateTrabajadorDto): Promise<ICreateResponse> {
    const { password, ...trabajador } = data;

    const hash = await this.hashService.hashPassowrd(password);

    await this.prismaServe.trabajadores.create({
      data: {
        ...trabajador,
        password: hash,
      },
    });

    return {
      msg: 'Trabajador creado',
    };
  }

  async login(data: LoginDto): Promise<ILoginResponse> {
    const { password, user_name } = data;

    const trabajador = await this.prismaServe.trabajadores.findFirst({
      where: {
        user_name,
      },
    });

    if (!trabajador) throw new NotFoundException('Credenciales incorrectas');

    const pwd = await this.hashService.comparePassword(
      password,
      trabajador.password,
    );

    if (!pwd) throw new NotFoundException('Credenciales incorrectas');

    const token = await this.jsonWebTokenService.asignIn(
      trabajador.name,
      trabajador.user_name,
      trabajador.id,
    );

    return {
      token,
      user: {
        name: trabajador.name,
        role: trabajador.role,
      },
    };
  }
}
