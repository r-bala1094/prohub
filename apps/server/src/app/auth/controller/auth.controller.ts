import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {


    @Post("register")
    public async register(@Body() user) {

    }
}
