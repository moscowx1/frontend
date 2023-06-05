import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useStore } from "effector-react";
import { createForm, useForm } from "effector-forms";
import { createEffect, forward } from "effector";
import React from "react";
import * as Auth from "../services/auth";
import * as E from "fp-ts/Either";

export const loginForm = createForm({
  validateOn: ["submit", "blur"],
  fields: {
    login: {
      init: "",
      rules: [
        {
          name: "minLength",
          validator: (value: string) => {
            return value.length > 5;
          },
        },
      ],
    },
    password: {
      init: "",
      rules: [
        {
          name: "minLength",
          validator: (value: string) => value.length > 5,
        },
      ],
    },
  },
});

export const loginFx = createEffect(() => {
  console.log(12);
  return 1;
});
export const resetFx = createEffect();

forward({
  from: loginForm.submit,
  to: loginFx,
});

const AuthForm = () => {
  const { fields, submit, eachValid, isTouched } = useForm(loginForm);
  const pending = useStore(loginFx.pending);
  console.log(eachValid);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
    if (!isTouched || !eachValid) return;

    const login = fields.login.value;
    const password = fields.password.value;
    submit();
    const res = await Auth.login(login, password)();
    console.log(res);
    //submit();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={submitHandler}
        >
          <TextField
            margin="normal"
            fullWidth
            label="Login"
            disabled={pending}
            onChange={(e) => fields.login.onChange(e.target.value)}
            name="login"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            disabled={pending}
            onChange={(e) => fields.password.onChange(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!eachValid || pending}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthForm;
