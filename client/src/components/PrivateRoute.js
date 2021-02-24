import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'

// eslint-disable-next-line
const getUserFromToken = token => {
  if (token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      // ignore
    }
  }
  return null;
};

const getSession = () => {
  const jwt = Cookies.get('slb-token');
  let session;
  try {
    if (jwt) {
      const base64Url = jwt.split('.')[1]
      const base64 = base64Url.replace('-', '+').replace('_', '/')
      // what is window.atob ?
      // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob
      session = JSON.parse(window.atob(base64));
    }
  } catch (error) {
    console.error(error);
  }
  return session;
}

// eslint-disable-next-line
const logOut = () => {
  Cookies.remove('slb-user')
}


const PrivateRoute = ({
  component: Component,
  layout: Layout,
  ...rest
}) => {

  Layout = (Layout === undefined) ? props => (<React.Fragment>{props.children}</React.Fragment>) : Layout;
  const session = getSession()

  return (
    <Route
      {...rest}
      render={props => !!session ? (
        <Layout {...rest} userSession={session} >
          <Component {...props}/>
        </Layout>
      ) : (
        <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
        />
      )} />
  );
}

export default PrivateRoute;