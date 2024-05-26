import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Paths from './Paths';

const AuthenticateRoute = ({ component: Component, roles, ...rest }) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const { role } = user;

  return (
    <Route
      {...rest}
      render={(props) => (roles.includes(role) ? (
        <Component {...props} />
      ) : (
        <Redirect to={Paths.Home} />
      ))}
    />
  );
};

export default AuthenticateRoute;
