import { z } from "zod";

export const UserSchema = z.object({
  username: z
    .string()
    .min(6, { message: "Username must be atleast 6 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});

export type UserAuthSchema = z.infer<typeof UserSchema>;
