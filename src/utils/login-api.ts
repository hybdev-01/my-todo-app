import { AxiosError } from "axios";
import { appAPI } from "../config";
import type { User, UserData } from "../types/User";
import { generateJWT, secretKey, verifyJWT } from "./jwt-fc";

export const userAuth = async ({
  username,
  password,
}: Pick<User, "username" | "password">): Promise<UserData> => {
  try {
    const response = await appAPI.get<User[]>("/users", {
      params: {
        username,
      },
    });

    const [userData] = response.data.filter(
      (user) => user.username === username && user.password === password
    );
    if (userData) {
      const newToken = await generateJWT(userData.id);

      return {
        id: userData.id,
        firstName: userData.firstName,
        username: userData.username,
        token: newToken,
      };
    } else throw new AxiosError("You enter incorrect login or password");
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.status === 404) throw new Error("User is not exists");

      throw new Error(e.message);
    }

    return {} as UserData;
  }
};

export const userSignUp = async (
  data: Omit<User, "id" | "createdAt">
): Promise<UserData> => {
  try {
    const response = await appAPI.get<User[]>("/users", {
      params: { username: data.username },
    });

    const [checkUser] = response.data.filter(
      (user) => user.username === data.username
    );

    if (checkUser) throw new AxiosError("User with that login exists");

    return {} as UserData;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.status === 404) {
        const response = await appAPI.post<User>("/users", data);

        const userData = response.data;

        const newToken = await generateJWT(+userData.id);

        return {
          id: +userData.id,
          username: userData.username,
          firstName: userData.firstName,
          token: newToken,
        };
      }

      throw new Error(e.message);
    }

    return {} as UserData;
  }
};

export const checkUserAuth = async (userUpdateFunc: (user: User) => void) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const { payload } = await verifyJWT(token, secretKey);

    if (!payload.userId) return;

    const response = await appAPI.get<User>(`users/${payload.userId}`);
    const currentUser = response.data;
    userUpdateFunc(currentUser);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
};
