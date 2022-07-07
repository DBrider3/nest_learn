import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
	constructor(private authServices: AuthService) {}

	@Post('/signup')
	signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
		return this.authServices.signUp(authCredentialsDto);
	}

	@Post('/signin')
	signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
		return this.authServices.signIn(authCredentialsDto);
	}

	@Post('/test')
	// Guard 미들웨어를 이용하여 @nestjs/passport에서 가져온 AuthGuard()를 이용하면 요청안에 유저 정보를 넣어줄수 있다.
	@UseGuards(AuthGuard())
	test(@GetUser() user: User){
		//console.log(user);
	}
}
