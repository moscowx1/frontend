import zod, { ZodError } from "zod";
import * as E from "fp-ts/Either";

export const userSchema = zod.object({
  login: zod.string().min(5),
  role: zod.string(),
});

export type User = zod.infer<typeof userSchema>;

export const parseUser = (obj: Object): E.Either<zod.ZodError, User> => {
  try {
    return E.right(userSchema.parse(obj));
  } catch (e) {
    return E.left(e as ZodError);
  }
};
