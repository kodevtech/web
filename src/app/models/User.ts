export class User {
  constructor(public email: string,
    public password: any,
    public cpassword: any,
    public terms: boolean,
    public firstName: string,
    public lastName: string,
    public userName: string,
    public imagePath: any) {
  }
}

export class CreateUser {
  constructor(public email: string,
    public firstName: string,
    public lastName: string,
    public userName: string,
    public permissionId: any,
    public companyId: any,
    public imagePath: any) {
  }
}
