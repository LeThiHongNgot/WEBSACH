export interface Customer {
  id: string;
  fullName: string;
  photo: string;
  activated: boolean;
  password: string;
  email: string;
  gender: string;
  address: string;
  birthday: Date | null;
  phone:string;
}
