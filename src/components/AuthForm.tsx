import { Button, TextField } from "@mui/material";

const AuthForm = () => {
  return (
    <>
      <form>
        <TextField required label='login' autoFocus/>
        <TextField required label='password' type="password"/>
        <Button type='submit'>Auth</Button>
        <Button type='reset'>Reset</Button>
      </form>
    </>
  )
}

export default AuthForm;