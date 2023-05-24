import { User } from "../domain/user";
import { $configuration } from "./config";

export async function login(user: string, password: string): Promise<User> {
  const { baseUrl } = $configuration.getState();
  const res = await fetch(`${baseUrl}/auth/sign-in`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    }
  })
    .then((m) => m.json())
    .then((v) => v as User);

  return res;
}