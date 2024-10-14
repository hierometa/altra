import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  async getInvoices(page: number, user: any): Promise<any[]> {
    // const limit = 5; // Number of invoices per page
    const limit = parseInt(process.env.INVOICE_PER_PAGE_LIMIT || '5', 10); // Number of invoices per page || Convert limit to a number
    const offset = (page - 1) * limit; // Calculate pagination offset

    // console.log('--->', user);
    const invoices = await this.prisma.invoice.findMany({
      skip: offset,
      take: limit,
      where: {
        user_id: user.uid,
      },
      orderBy: { id: 'asc' },
    });
    // console.log(invoices);
    return invoices;
  }

  async getInvoice(id: number, user: any): Promise<any> {
    // console.log('user getInvoice', user.user.uid);
    const invoice = await this.prisma.invoice.findUnique({
      where: { id: id, user_id: user.user.uid },
    });
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    // console.log(invoice);
    return invoice;
  }

  async getInvoicesTotalsByDate(user: any): Promise<any[]> {
    // console.log('user getInvoicesTotalsByDate', user);
    const invoiceTotalsByDate = await this.prisma.invoice.groupBy({
      by: ['due_date'], // GROUP BY due_date
      _sum: { amount: true }, // SUM(amount)
      orderBy: { due_date: 'asc' }, // ORDER BY due_date
      where: { user_id: user.user.uid }, // WHERE user_id
    });

    // Calculate subtotals for paid and unpaid invoices
    const totalsWithSubtotals = await Promise.all(
      invoiceTotalsByDate.map(async (dateTotal) => {
        const paidSubtotal = await this.prisma.invoice.aggregate({
          _sum: { amount: true },
          _count: { paid: true },
          where: {
            due_date: dateTotal.due_date,
            paid: true,
          },
        });

        const unpaidSubtotal = await this.prisma.invoice.aggregate({
          _sum: { amount: true },
          _count: { paid: true },
          where: {
            due_date: dateTotal.due_date,
            paid: false,
          },
        });

        return {
          due_date: dateTotal.due_date,
          total_summary: {
            total_amount: dateTotal._sum.amount || 0, // Total amount for all invoices on date
            by_status: {
              paid: {
                subtotal: paidSubtotal._sum.amount || 0, // Paid Subtotal
                count: paidSubtotal._count.paid || 0, // Paid Count
              },
              unpaid: {
                subtotal: unpaidSubtotal._sum.amount || 0, // Unpaid Subtotal
                count: unpaidSubtotal._count.paid || 0, // Unpaid Count
              },
            },
          },
        };
      }),
    );
    return totalsWithSubtotals;
  }
}
