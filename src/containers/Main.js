import React from 'react';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import {authUser} from '../store/actions/auth';
import {removeError} from '../store/actions/error';
import withAuth from "../hocs/withAuth";
import MessageForm from "../containers/MessageForm";

const Main = props => {
    let {authUser, error, removeError, currentUser} = props;
    return (
        <div className="container">
            <Switch>
                <Route exact path='/' render={props => <Homepage currentUser={currentUser} {...props}/>}/>
                <Route exact path='/signin' 
                        render={props => <AuthForm {...props} 
                        buttonText="Login" 
                        heading="Welcome back!"
                        onAuth={authUser}
                        error={error}
                        removeError={removeError}
                        />} />
                <Route exact path='/signup' 
                        render={props => <AuthForm {...props} 
                        buttonText="Signup" 
                        heading="Join Warbler today!" 
                        signup
                        onAuth={authUser}
                        error={error}
                        removeError={removeError}
                        />} />
                <Route
                    path="/api/users/:id/messages/new"
                    component={withAuth(MessageForm)}
                />
            </Switch>
        </div>
        );
};

const mapStateToProps = function(state) {
    return {
        currentUser: state.currentUser,
        error: state.error
    };
};

export default withRouter(connect(mapStateToProps, {authUser, removeError})(Main));