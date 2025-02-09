import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class WrapDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Logic of intercept request
    return next.handle().pipe(
      map((data) => {
        // Logic of intercept response
        const req = context.switchToHttp().getResponse();
        return { statusCode: req.statusCode, data: data };
      }),
    );
  }
}
