import { z } from "zod";

export const signupValidation = z.object({
  name: z.string().min(3, { message: "This is too short" }),
  username: z.string().min(2, { message: "This is too short" }),
  email: z.string().min(2),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});
