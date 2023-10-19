import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoginPage from '../Login-Register/Login/LoginPage';
import { useSelector } from 'react-redux';

// A Custom Wrapper Component -- This will keep our code DRY.
// Responsible for watching redux state, and returning an appropriate component
// API for this component is the same as a regular route

// THIS IS NOT SECURITY! That must be done on the server
// A malicious user could change the code and see any view
// so your server-side route must implement real security
// by checking req.isAuthenticated for authentication
// and by checking req.user for authorization

function ProtectedRoute({ component, children, ...props }) {
  const user = useSelector((store) => store.user);

  // Component may be passed in as a "component" prop,
  // or as a child component.
  const ProtectedComponent = component || (() => children);

  //! The below return statement creates protected routes.
  //! The protection has been removed, but protected version
  //! is being left in the code as a comment until we can test
  //! the difference thoroughly
  /*
  return (
    <Route
      // all props like 'exact' and 'path' that were passed in
      // are now passed along to the 'Route' Component
      {...props}
    >
      {user.id ?
        // If the user is logged in, show the protected component
        <ProtectedComponent />
        :
        // Otherwise, redirect to the Loginpage
        <LoginPage />
      }
    </Route>

  );
  */

  // Unprotected version
  return (
    <Route {...props}>
      <ProtectedComponent />
    </Route>
  );
}

export default ProtectedRoute;
