import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.sass';
import './App.css'

// Route Helpers
import AppRoute from './components/AppRoute';
import PrivateRoute from './components/PrivateRoute';

// Layouts
import LayoutDefault from './components/layout/LayoutDefault';
import LayoutUnAuth from './components/layout/LayoutUnAuth';

// Pages / Views for Unauthenticated / new users
import Splash from './views/Splash';
import Login from './views/Login';
import Signup from './views/Signup';

// Pages / Views for logged in users
import CreateBoardView from './views/boards/CreateBoard';
import Dashboard from './views/Dashboard';
import AccountPage from './views/Account';

function App() {

  const alert = useSelector(state => state.alert)

  return (
    <div className="App">
      <Router>
      <div>
        {/* Routes */}
        <Switch>
          <AppRoute exact path="/" layout={LayoutUnAuth}>
            <Splash />
          </AppRoute>
          <AppRoute path="/about" layout={LayoutUnAuth}>
            <div>About page</div>
          </AppRoute>
          <AppRoute exact path="/register" layout={LayoutUnAuth}>
            <Signup />
          </AppRoute>
          <AppRoute exact path="/login" layout={LayoutUnAuth}>
            <Login />
          </AppRoute>

          {/* Auth Required routes for a logged in user */}

          <PrivateRoute exact path="/dashboard" component={Dashboard} layout={LayoutDefault} />
          <PrivateRoute exact path="/boards/create" component={CreateBoardView} layout={LayoutDefault} />
          <PrivateRoute exact path="/account" component={AccountPage} layout={LayoutDefault} />

        </Switch>

      </div>
      </Router>
    </div>
  );
}

export default App;
