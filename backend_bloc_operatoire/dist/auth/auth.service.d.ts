import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private userRepo;
    private jwtService;
    constructor(userRepo: Repository<User>, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        token: string;
        user: Partial<User>;
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: Partial<User>;
    }>;
    private generateToken;
    validateUser(id: string): Promise<User | null>;
}
