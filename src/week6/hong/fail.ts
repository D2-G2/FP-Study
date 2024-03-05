/**
 * 코드 냄새를 없애기 위해 아래와 같은 방법으로 BearerTokenGuard 클래스를 만들었으나
 * 
 * 의존성 주입부분에 문제가 있어 실패했습니다.
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

BearerTokenGuard bearerTokenGuard = new BearerTokenGuard(authService, usersService, 'refresh');