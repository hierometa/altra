import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { InvoiceModule } from './invoice/invoice.module';

import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { InvoiceController } from './invoice/invoice.controller';

import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { InvoiceService } from './invoice/invoice.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  controllers: [AppController, AuthController, InvoiceController],
  providers: [AppService, AuthService, InvoiceService, PrismaService],
  imports: [InvoiceModule, AuthModule],
})
export class AppModule {}
