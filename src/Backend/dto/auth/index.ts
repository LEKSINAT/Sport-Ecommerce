export interface RegisterDto {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  roleName?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}
