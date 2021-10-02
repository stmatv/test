import {
    Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {AuthGuard} from "@nestjs/passport";

@Controller('users')
export class UsersController {
    constructor( private usersService: UsersService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    async create( @Body() userDto: CreateUserDto){
        const user = await this.usersService.findOne(userDto.phone);
        if(user){
            this.usersService.lastVisit(user);
            return {"error":"user exists"};
        }
        return this.usersService.createUser(userDto)
    }
    @UseGuards(AuthGuard('local'))
    @Get()
    getAll() {
        return this.usersService.getUsersList();
    }

}
