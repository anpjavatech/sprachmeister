import { Form, useSearchParams, NavLink, useActionData, useNavigation } from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {

  const navigation = useNavigation();
  const data = useActionData();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting  = navigation.state==="submitting";

  let content = (
    <>
      <p>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
      </p>
      <p>
        <label htmlFor="image">Password</label>
        <input id="password" type="password" name="password" required />
      </p>
      
      { isLogin ? null: <>
        <p>
            <label htmlFor="firstName">FirstName</label>
            <input id="firstName" type="string" name="firstName" required />
        </p>
        <p>
            <label htmlFor="lastName">LastName</label>
            <input id="lastName" type="string" name="lastName" required />
        </p>
        <p>
            <label htmlFor="age">Age</label>
            <input id="age" type="number" name="age" required />
        </p>
        <p>
            <label htmlFor="profession">Profession</label>
            <input id="profession" type="string" name="profession" required />
        </p>
      </>}
    </>
  )

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Sign in' : 'Sign up'}</h1>

        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map(err => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}

        {data && data.message && <p>{data.message}</p>}
        {content}
        <div className={classes.actions}>
          <NavLink to={`?mode=${isLogin? "signup" : "login"}`}>
            {isLogin ? 'Sign up' : 'Sign in'}
          </NavLink>
          <button>{isSubmitting ? "Submitting...":"Save"}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
