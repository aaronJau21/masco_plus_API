import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateTrabajadorDto } from './dtos/createTrabajador.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create-user')
  createUser(@Body() data: CreateTrabajadorDto) {
    return this.authService.createUser(data);
  }

  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
