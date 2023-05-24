import { createStore } from 'effector';
import zod from 'zod';

export const appMode = zod.enum(['Debug', 'Production'] as const);
export type AppMode = zod.infer<typeof appMode>;

export const config = zod.object({
  baseUrl: zod.string().url(),
  appMode: appMode
});
export type Config = zod.infer<typeof config>;

export const $configuration = createStore(() => {
  console.log(process.env);
  return config.parse(process.env)
}
);
