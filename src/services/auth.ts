import { ZodError } from "zod";
import { User, parseUser } from "../domain/user";
import { $configuration } from "./config";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import * as RTE from "fp-ts/ReaderTaskEither";
import { flow, pipe } from "fp-ts/lib/function";
import { chain } from "fp-ts/lib/EitherT";

export type Method = "GET" | "POST";

enum LoginErr {
  HttpErr = "HttpErr",
  ParseErr = "ParseErr",
}
type JsonParseErrorEnum = "NotSuccessStatusCode" | "ValidateError";

class JsonParseError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(message: JsonParseErrorEnum) {
    super(message);
  }
}

type HttpErr = { readonly type: LoginErr.HttpErr; err: Error };
type ParseErr = {
  readonly type: LoginErr.ParseErr;
  err: ZodError | JsonParseError;
};
type LoginErrState = HttpErr | ParseErr;

const httpErr = (err: Error): HttpErr => ({ err, type: LoginErr.HttpErr });
const parseErr = (err: ZodError): ParseErr => ({
  err,
  type: LoginErr.ParseErr,
});

const requestBase =
  (path: string, method: Method) =>
  (body: Object): TE.TaskEither<HttpErr, Response> =>
    TE.tryCatch(
      async () => {
        const { baseUrl } = $configuration.getState()();
        return fetch(`${baseUrl}/${path}`, {
          method,
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        });
      },
      (e: unknown) => httpErr(e as Error)
    );

const toObject = (response: Response): TE.TaskEither<HttpErr, Object> => {
  if (!response.ok)
    return TE.left(httpErr(new JsonParseError("NotSuccessStatusCode")));

  return TE.tryCatch(
    () => response.json(),
    () => httpErr(new JsonParseError("ValidateError"))
  );
};

export function login(
  login: string,
  password: string
): TE.TaskEither<LoginErrState, User> {
  const req = requestBase("auth/sign-in", "POST");
  const parseUser1 = flow(parseUser, E.mapLeft(parseErr), TE.fromEither);
  //const zzz = pipe(req, TE.chain(toObject));
  //const zzz2 = pipe(zzz, TE.chain(parseUser1));
  const zzz = pipe(req, TE.chainEitherKW(toObject, parseUser1));

  const z = flow(req, TE.chainEitherKW(toObject), TE.chainEitherKW(parseUser1));
  const m2: TE.TaskEither<LoginErrState, Object> = flow(
    toObject,
    TE.mapLeft((e) => e)
  );

  const m = pipe(
    { login, password },
    req,
    TE.chain(toObject),
    TE.chainEitherKW(parseUser1)
  );
  return TE.fromIO;

  return pipe(
    { login, password },
    req,
    flow(TE.chain(toObject)),
    flow(TE.chain(parseUser1))
  );
  //return pipe(req, TE.bind("json", toObject), TE.)
}

const z: Object = null as any as TE.TaskEither<Object, Object>;
console.log(z);
