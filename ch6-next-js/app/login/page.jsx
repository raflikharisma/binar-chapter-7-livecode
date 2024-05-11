"use client";

import { useFormState } from "react-dom";
import classes from "./page.module.css";
import { shareMeal, signInAction } from "@/lib/actions";
import LoginFormSubmit from "@/components/login/login-button-submit";

export default function LoginPage() {
  const [state, formAction] = useFormState(signInAction, { message: null });


  if(state.status === "success"){
    redirect("/");
  }
  return (
    <>
      <header className={classes.header}>
        <h1>
          Login with <span className={classes.highlight}>your account</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <p>
            <label htmlFor="email">Title</label>
            <input type="email" id="email" name="email" required />
          </p>
          <p>
            <label htmlFor="password">Short Summary</label>
            <input type="password" id="password" name="password" required />
          </p>
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <LoginFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
