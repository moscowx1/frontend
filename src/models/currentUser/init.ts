import { $currentUser, $currentUserError, loginFx, logout } from ".";
import { userSchema } from "../../domain/user";
import { requestBase } from "../../services/request";

loginFx.use(async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return requestBase(
    "auth/sign-in",
    "POST"
  )(data)
    .then((r) => r.json())
    .then(userSchema.parse);
});

$currentUserError.on(loginFx, () => null).on(loginFx.failData, (_, e) => e);

loginFx.fail.watch(({ error }) => {
  console.error(error);
});

$currentUser.reset(logout).on(loginFx.doneData, (_, u) => u);
