import * as jwt from "jsonwebtoken";

export async function generateToken(payload: any): Promise<string> {
  return await jwt.sign(payload, "randomString", {
    expiresIn: 10000,
  });
}
