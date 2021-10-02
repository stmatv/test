import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(phone: string, sms: string): Promise<any> {
        const user = await this.usersService.findOne(phone);
        if (user && user.sms === sms) {
            const {  ...result } = user;
            return result;
        }
        return null;
    }
}