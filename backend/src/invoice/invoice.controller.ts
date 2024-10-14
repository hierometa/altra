import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { JwtGuard } from '../jwt/jwt.guard';
import { Request } from 'express'; // Import Request type

interface UserInfoRequest extends Request {
  user: any; // User object type
}
interface InvoiceAndUserInfoResponse {
  invoices: any[]; // Invoices array type
  user: any; // User object type
}

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getInvoices(
    @Req() req: UserInfoRequest,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number, // Optional
  ): Promise<InvoiceAndUserInfoResponse> {
    try {
      const user = req.user; // Get user info from the JWT token

      const pg = Math.max(page || 1, 1); // Request pg || Default pg || Min pg (e.g. non-neg)
      const invoices = await this.invoiceService.getInvoices(pg, user);

      return { invoices, user }; // Return invoices and user info
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtGuard)
  @Get('total')
  getInvoicesTotalsByDate(@Req() req: UserInfoRequest): any {
    return this.invoiceService.getInvoicesTotalsByDate(req);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getInvoice(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: UserInfoRequest,
  ): Promise<any> {
    return await this.invoiceService.getInvoice(id, req);
  }
}
