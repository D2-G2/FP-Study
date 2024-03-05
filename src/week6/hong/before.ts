/**
 * RefreshTokenGuard, AccessTokenGuard 클래스는
 *
 * 클래스 이름에 암묵적 인자인 Refresh 와 Access 가 있어 코드 냄새가 납니다.
 */

/**
 * Bearer 토큰 검증
 */
@Injectable()
export class BearerTokenGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService, //인증 서비스
    private readonly usersService: UsersService //유저 서비스
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
  async canActivate(context: ExecutionContext): Promise<boolean> {
    /**
     * BearerTokenGuard 의 canActivate 로직이 수행되고 아래 값들이 req에 초기화되어있는 상태
     *
     * req.user = user;
     * req.token = token;
     * req.tokenType = payload.type;
     */
    await super.canActivate(context);

    const req = context.switchToHttp().getRequest();

    if (req.tokenType !== "access") {
      //access 토큰이 아니면 예외
      throw new UnauthorizedException("Access 토큰이 아닙니다.");
    }

    return true;
  }
}

/**
 * RefreshToken 검증
 */
@Injectable()
export class RefreshTokenGuard extends BearerTokenGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    /**
     * BearerTokenGuard 의 canActivate 로직이 수행되고 아래 값들이 req에 초기화되어있는 상태
     *
     * req.user = user;
     * req.token = token;
     * req.tokenType = payload.type;
     */
    await super.canActivate(context);

    const req = context.switchToHttp().getRequest();

    if (req.tokenType !== "refresh") {
      //refresh 토큰이 아니면 예외
      throw new UnauthorizedException("Refresh 토큰이 아닙니다.");
    }

    return true;
  }
}
