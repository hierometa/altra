import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // Query DB for user by email
    const user = await this.prisma.user.findUnique({ where: { email } });

    // If user found and passwords match, return user
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user; // Destructure user, omitting password
      return result;
    }
    // Otherwise return null
    return null;
  }

  async login(user: any): Promise<string> {
    const payload = { email: user.email, uid: user.id, name: user.name }; // Create JWT payload for user info
    return this.jwtService.sign(payload);
  }

  // async login(user: any): Promise<{ access_token: string }> {
  //   const payload = { email: user.email, uid: user.id, name: user.name }; // Create JWT payload for user info
  //   return {
  //     access_token: this.jwtService.sign(payload), // Use JwtService to sign JWT
  //   };
  // }
}
