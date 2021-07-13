export interface JwtPayload {
  userCred?: JwtPayload | null | undefined;
  email?: string;
  _id?: string;
  accountType?: string;
}

export interface JwtTokenRes {
  token: string;
  tokenExpireDur: string | number;
  tokenExpiresAt: number;
}

export interface VerifiedToken extends JwtPayload {
  status: boolean;
  payload?: JwtPayload | null;
}
