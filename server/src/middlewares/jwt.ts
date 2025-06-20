import config from "../config";
import * as JWT from "jsonwebtoken";
import { JWT_EXPIRY } from "../shared/constants";

export default function generateToken(data: string): string {
  return JWT.sign({ data }, config.JWT_SECRET, JWT_EXPIRY as JWT.SignOptions);
}

export function verifyToken(token: string) {
  const data = JWT.verify(token, config.JWT_SECRET) as { data: string };
  return data;
}
