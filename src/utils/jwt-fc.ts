import { jwtVerify, SignJWT } from "jose";

const secret = import.meta.env.VITE_SECRET_KEY;

export const secretKey = new TextEncoder().encode(secret);

export const generateJWT = async (userId: number) => {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secretKey);

  return token;
};

export const verifyJWT = async (
  token: string,
  secret: Uint8Array<ArrayBuffer>
) => {
  const result = await jwtVerify(token, secret);

  return result;
};
