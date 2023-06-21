import { $configuration } from "./config";

export type Method = "GET" | "POST";

export const requestBase =
  (path: string, method: Method) =>
  async <TBody>(body: TBody): Promise<Response> => {
    const { baseUrl } = $configuration.getState()();
    return await fetch(`${baseUrl}/${path}`, {
      method,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };
