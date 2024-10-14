import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @UsePipes(ValidationPipe) // Validate via Auth DTO
  async login(@Body() authDto: AuthDto): Promise<any> {
    // Validate credentials email and password
    const user = await this.authService.validateUser(
      authDto.email,
      authDto.password,
    );

    // If validation fails, throw exception
    if (!user) throw new UnauthorizedException('Invalid email or password');

    // If validation passes, return JWT token
    return await this.authService.login(user);
  }
}
