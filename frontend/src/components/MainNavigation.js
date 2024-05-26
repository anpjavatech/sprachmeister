import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const token = useRouteLoaderData("root");

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          {token && (
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Home
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink
                to="/challenges"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                MentalGym
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink
                to="/questions"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Questions
              </NavLink>
            </li>
          )}
          {!token && (
            <li>
              <NavLink
                to="/auth?mode=login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Authentication
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <Form action="/logout" method="post">
                <button>logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
