import { Injectable } from '@nestjs/common';
import { WelcomeMessage } from './messages.class';

@Injectable()
export class AppService {
  getHello(): WelcomeMessage {
    return { message: 'Hello World!', documentation: '/api' };
  }
}
