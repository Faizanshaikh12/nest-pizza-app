export interface IUser {
  _id: string,
  name: string,
  email: string,
  role: string,
  password: string,
}

export interface IAuthUser extends IUser {
  token?: string
}