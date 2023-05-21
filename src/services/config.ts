import { Either, left, right } from 'fp-ts/Either';

const appMode = ['Debug', 'Production'] as const;
type AppMode = typeof appMode[number];

export type Config = {
  baseUrl: URL;
  appMode: AppMode;
}

export type ParseError = {
  field: string;
  message: string;
}

type StringLiteral<T> = T extends `${string & T}` ? T : never;

const test = <T>(value: string): Either<string, StringLiteral<T>> => {
  return (null as any);
}

const config: Config | null = null;


const url = (value: string, errMsg?: string): Either<string, URL> => {
  try {
    return right(new URL(value));
  } catch (e: unknown) {
    if (errMsg) {
      return left(errMsg);
    }

    if (e instanceof Error) {
      return left(`${e.name} -- ${e.message}`);
    }

    return left('error creating url');
  }
}

type Kek = string;

function readConfigFromEnv(rawConfig: any): Config {
  const {
    BASE_URL = undefined,
    APP_MODE = undefined,
  } = rawConfig;

  return (null as any);
}

export function configuration() {
  if (config !== null) {
    return config;
  }


}