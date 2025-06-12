import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserdto } from './dto/create.user.dto'
import { LoginUserDto } from './dto/login.user.dto';

@Controller('auth') 
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createuserdto: CreateUserdto){
    return this.authService.register(createuserdto);
  }

  @Post('login')
  login(@Body() loginuserdto: LoginUserDto){
    return this.authService.login(loginuserdto.email, loginuserdto.password);
  }

}
