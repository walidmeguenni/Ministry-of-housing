import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class BcryptHelper {
  constructor() {}

  static async hashString(str: string): Promise<string> {
    return await bcrypt.hash(str, 10);
  }

  async hashString(str: string): Promise<string> {
    return await bcrypt.hash(str, 10);
  }

  async compareBtw(str: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(str, hashed);
  }
}
