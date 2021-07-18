import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    try {
      const { _id, username, email } = await this.jwtService.verifyAsync(token);
      req.user = { _id, username, email };
      next();
    } catch (err) {
      throw new UnauthorizedException(err.message || 'invalid token');
    }
  }
}
