import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getBlank(): string {
    return '';
  }
}
