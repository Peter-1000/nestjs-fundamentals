import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { stat } from 'fs';
import { map, Observable } from 'rxjs';

@Injectable()
export class WrapDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Logic of intercept request
    return next.handle().pipe(
      map((data) => {
        const req = context.switchToHttp().getResponse();
        // Logic of intercept response
        return { statusCode: req.statusCode, data: data };
      }),
    );
  }
}
