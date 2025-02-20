import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(1, "Name is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
