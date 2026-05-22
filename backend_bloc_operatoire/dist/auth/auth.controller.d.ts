import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        token: string;
        user: Partial<import("../entities").User>;
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: Partial<import("../entities").User>;
    }>;
    getProfile(req: any): any;
}
