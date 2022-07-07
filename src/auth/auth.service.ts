import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserRepository)
		private userRepository: UserRepository,
		private jwtService: JwtService
	) {}

	signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		return this.userRepository.createUser(authCredentialsDto);
	}

	async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
		const {username, password} = authCredentialsDto;
		const user = await this.userRepository.findOne({username});

		// bcrypt는 rainbow table에 salt+hash 를 저장해놓고 비교 한다.
		if (user && (await bcrypt.compare(password, user.password))) {
			// 유저 토큰 생성 ( Secret + Payload )
			const payload = {username};
			const accessToken = await this.jwtService.sign(payload);

			return {accessToken};
		} else {
			throw new UnauthorizedException('logIn Failed');
		}
	}

}
