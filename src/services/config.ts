import zod from "zod";
import { createStore } from "effector";

const _appMode = ["Debug", "Production"] as const;
export const appMode = zod.enum(_appMode);
export type AppMode = zod.infer<typeof appMode>;

export const config = zod.object({
  baseUrl: zod.string().url(),
  appMode: appMode,
});
export type Config = zod.infer<typeof config>;

export const $configuration = createStore(() => {
  const values = process.env;
  try {
    return config.parse({
      baseUrl: values.REACT_APP_BASE_URL,
      appMode: values.REACT_APP_MODE,
    });
  } catch {
    throw new Error("invalid dotenv configuration");
  }
});
