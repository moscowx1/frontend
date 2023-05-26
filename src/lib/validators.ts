import { Either, right, left } from "fp-ts/Either";

export const required = <T extends any>(
  value: T,
  errMsg?: string
): Either<string, T> =>
  value === undefined || value === null
    ? right(value)
    : left(!!errMsg ? errMsg : "must not be null or undefined");

export const url = (value: string, errMsg?: string): Either<string, URL> => {
  try {
    return right(new URL(value));
  } catch (e: unknown) {
    if (errMsg) {
      return left(errMsg);
    }

    if (e instanceof Error) {
      return left(`${e.name} -- ${e.message}`);
    }

    return left("error creating url");
  }
};
