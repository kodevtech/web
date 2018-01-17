export class Profile {
  constructor(public id: any,
    public userName: any,
    public firstName: any,
    public lastName: any,
    public email: any,
    public imagePath: any,
    public previewPath: any) {
  }
}

export interface Info {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  displayName: string;
  imagePath: string;
}
