import React from 'react';
import './Tab3.css';
import {Redirect, Route, RouteProps} from "react-router";
import Login from "./login/login";

export interface PrivateRouteProps extends RouteProps {
    component: any;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({
                                                        component: Component,
                                                        ...props
                                                    }) => {
    // TODO: implement your own authentication here...
    let isAuthorised = false;
    if (  localStorage.getItem('token')) {
        isAuthorised = true
    }

    // the Login route gets handled differently...
    if (props.path === "/login") {
        return isAuthorised ? (
            <Redirect to="/tabs/dashboard" />
        ) : (
            <Route component={Login} />
        );
    }
    return (
        <Route
            {...props}
            render={(innerProps) => {
                return isAuthorised ? (
                    <Component {...innerProps} />
                ) : (
                    <Redirect to="/login" />
                );
            }}
        />
    );
};
export default PrivateRoute;
