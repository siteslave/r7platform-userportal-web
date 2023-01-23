export interface UserList {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  hospitals: {
    hospcode: string;
    hospname: string;
  }
  enabled: boolean;
  last_login: string;
}