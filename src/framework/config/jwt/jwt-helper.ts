import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../types/jwt-payload.interface';

@Injectable()
export class JwtHelper {
  constructor(private jwtService: JwtService) {}

  encodeToken(payload: JwtPayload, options = {}): string {
    return this.jwtService.sign(payload, options);
  }

  validateToken(jwtToken: string, options = {}) {
    try {
      return this.jwtService.verify(jwtToken, options);
    } catch (err) {
      console.warn('error | validateToken =>', { jwtToken }, err);
      return false;
    }
  }

  decodeToken(jwtToken: string, options = {}) {
    return this.jwtService.decode(jwtToken, options);
  }
}
