class User {
  protected name: string;
  protected email: string;
  protected password: string;
}

export class UserDTO extends User {
  protected name: string;
  protected email: string;
  protected readonly password: string;
}

export class CreateUserDTO extends UserDTO {
  name: string;
  email: string;
  password: string;
}

export class UpdateUserDTO extends UserDTO {
  name: string;
  email: string;
  password: string;
}
