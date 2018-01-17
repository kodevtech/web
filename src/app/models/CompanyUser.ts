export class CompanyUser {
  constructor(public id: string,
    public firstName: string,
    public lastName: string,
    public userName: string,
    public email: string,
    public isVerified: boolean,
    public permission: string,
    public priority: any ,
    public imagePath: any ,
    public previewPath: any) {
  }
}
