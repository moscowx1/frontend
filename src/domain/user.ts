import zod from "zod";

export const userSchema = zod.object({
  login: zod.string().min(5),
  role: zod.string(),
});

export type User = zod.infer<typeof userSchema>;

export const parseUser = (obj: unknown): User => userSchema.parse(obj);
