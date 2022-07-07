import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as config from 'config';

// 다른 곳에서도 주입해서 사용할 수 있게 함
@Injectable()
// PassportStrategy 클래스 안의 기능을 사용하기 위해 상속, 인자로 Strategy는 passport-jwt를 사용하기 위해서
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		// token이 유효한지 파악한뒤 username으로 user객체를 가져오기 위해서
		@InjectRepository(UserRepository)
		private userRepository: UserRepository
	) {
		// 중요한 옵션 2가지
		super({
			// 2. secretOrKey: token이 유효한지 체크하기 위해서 쓰임
			secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
			// 1. 인증하기위해 Bearer token 토큰 타입으로 넘어오는것을 가져와서
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
		})
	}

	async validate(payload) {
		const {username} = payload;
		const user: User = await this.userRepository.findOne({username});

		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
