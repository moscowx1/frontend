import { User } from "../domain/user";
import { $configuration } from "./config";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/lib/function";

export type Method = "GET" | "POST";

enum LoginErr {
  HttpErr = "HttpErr",
  ParseErr = "ParseErr",
}

type HttpErr = { type: LoginErr.HttpErr; err: Error };
type ParseErr = { type: LoginErr.ParseErr; msg: String };
type LoginErrState = HttpErr | ParseErr;

const requestBase =
  (path: string, method: Method) =>
  (body: Object): TE.TaskEither<Error, Response> =>
    TE.tryCatch(
      async () => {
        const { baseUrl } = $configuration.getState()();
        return await fetch(`${baseUrl}/${path}`, {
          method,
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        });
      },
      (e: unknown) => e as Error
    );

export function login(
  login: string,
  password: string
): TE.TaskEither<Error, string> {
  const response = requestBase("auth/sign-in", "POST")({ login, password });
  return pipe(
    response,
    TE.map((_) => "hi")
  );
}
