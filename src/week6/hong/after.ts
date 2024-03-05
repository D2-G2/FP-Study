/**
 * Bearer 토큰 검증
 */
@Injectable()
export class BearerTokenGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService, //인증 서비스
    private readonly usersService: UsersService, //유저 서비스
    private readonly tokenType: string
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest(); //context에서 http request 가져오기

    const rawToken = req.headers["authorization"]; //request "Bearer {token}" 형식의 헤더 가져오기

    if (!rawToken) {
      //없으면 예외처리
      throw new UnauthorizedException("토큰이 없습니다.");
    }

    const token = this.authService.extractTokenFromHeader(rawToken, true); //헤더에서 토큰만 추출
    const payload = this.authService.verifyJwt(token); //토큰 검증
    const user = await this.usersService.getUserByEmail(payload.email); //토큰 payload의 userId로 DB에서 유저 select

    if (payload.type !== this.tokenType) {
      //생성자로 초기화해준 토큰이 아니면 예외
      throw new UnauthorizedException(`${this.tokenType} 토큰이 아닙니다.`);
    }

    // req에 유저, 토큰 정보 넣어주기
    req.user = user;
    req.token = token;
    req.tokenType = payload.type;

    return true; //guard pass
  }
}

/**
 * AccessToken 검증
 */
@Injectable()
export class AccessTokenGuard extends BearerTokenGuard {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {
    super(authService, usersService, "access"); // 생성자로 tokenType 넘겨주기
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return await super.canActivate(context);
  }
}

/**
 * RefreshToken 검증
 */
@Injectable()
export class RefreshTokenGuard extends BearerTokenGuard {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {
    super(authService, usersService, "refresh"); // 생성자로 tokenType 넘겨주기
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return await super.canActivate(context);
  }
}
