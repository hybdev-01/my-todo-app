export type User = {
  id: number;
  username: string;
  password: string;
  firstName: string;
  createdAt: Date;
};

export type UserData = Omit<User, "password" | "createdAt"> & {
  token: string;
};
