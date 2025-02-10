import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
    constructor(message?: string) {
        super(message || 'Something error!', HttpStatus.BAD_REQUEST);
    }
}