import { Injectable, ConflictException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/hash/hash.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JWT_SECRET } from 'src/utils/constants';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private hashService: HashService
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne({ where: { username } });
        const isMatchPassword = await this.hashService.compare(password, user.password)
        if (isMatchPassword) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload, { secret: JWT_SECRET }),
        };
    }

    async register(registerData: CreateUserDto) {
        const hashedPassword = await this.hashService.hash(registerData.password);
        registerData.password = hashedPassword;
        try {
            return await this.usersService.create(registerData)
        } catch (error) {
            throw new ConflictException('Не удалось создать запись. Возможно, такой юзер уже существует.')
        }

    }
}
