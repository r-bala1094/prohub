export interface UserCredentials {
  _id: string;
  email: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserCredentialsRequest extends Request {
  userCred: UserCredentials;
}
