/**
 *
 *  This is the IndexLoginForm
 *
 */

import { useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";

import styles from "../../../styles/modules/Index/Index.module.css";
import { handleLogin } from "@/assets/functions/async/handlers/handleLogin";

export const IndexLoginForm = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <section id="indexLoginForm" className={`${styles.index_login_form}`}>
      <form
        onSubmit={(e) => {
          handleLogin(e, username, password, setError, router);
        }}
        onReset={(e) => {
          setUsername("");
          setPassword("");
          setError("");
        }}
      >
        <div className={`${styles.form_set}`}>
          <input
            className="orientation-change-element half-second"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>

        <div className={`${styles.form_set}`}>
          <input
            className="orientation-change-element half-second"
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
        </div>

        {error ? (
          <span
            className={`${styles.error} orientation-change-element half-second`}
          >
            Error: {error}
          </span>
        ) : null}

        <div className={`${styles.form_btns}`}>
          <button
            type={"reset"}
            className={`${styles.reset} orientation-change-element half-second`}
          >
            Clear
          </button>
          <button
            type={"submit"}
            className={`${styles.login} orientation-change-element half-second`}
          >
            Login
          </button>
        </div>
      </form>
    </section>
  );
};
