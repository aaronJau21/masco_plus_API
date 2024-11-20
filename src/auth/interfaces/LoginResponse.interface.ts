export interface ILoginResponse {
  token: string;
  user: User;
}

export interface User {
  name: string;
  role: string;
}
