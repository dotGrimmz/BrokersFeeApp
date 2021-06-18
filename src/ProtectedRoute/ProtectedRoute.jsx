import React from 'react';

import { Route, Redirect } from 'react-router-dom';


const ProtectedRoute = ({ isAuth, component: Component, ...rest }) => {


    return (
        <Route {...rest} render={(props) => {
            if (window.sessionStorage.getItem('user')) {
                return <Component {...props} />;
            } else {
                return <Redirect to='/login' />
            }
        }}>

        </Route>
    )
}

export default ProtectedRoute;