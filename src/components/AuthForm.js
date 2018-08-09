import React, {Component} from 'react';

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            profileImageUrl: ''
        };
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        let {signup, history} = this.props;
        let authType = signup?'signup':'signin';
        this.props.onAuth(authType, this.state)
                    .then(() => {
                        history.push("/");
                    })
                    .catch(err => {
                        console.log(err);
                        return;
                    });
    }
    
    render() {
        let {email, username, profileImageUrl} = this.state;
        let {buttonText, heading, signup, error, removeError, history} = this.props;
        
        history.listen(() => removeError());
        
        return (
            <div>
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            {(error.message && <div className="alert alert-danger">{error.message}</div>)}
                            <label htmlFor='email'>Email: </label>
                            <input
                                className="form-control"
                                id="email"
                                name="email"
                                value={email}
                                onChange={this.handleChange}
                                type="email"
                            />
                            <label htmlFor='password'>Password: </label>
                            <input
                                className="form-control"
                                id="password"
                                name="password"
                                onChange={this.handleChange}
                                type="password"
                            />
                            {signup && 
                            (<div><label htmlFor='username'>Username: </label>
                            <input
                                className="form-control"
                                id="username"
                                name="username"
                                value={username}
                                onChange={this.handleChange}
                                type="text"
                            />
                            <label htmlFor='profileImageUrl'>Image URL: </label>
                            <input
                                className="form-control"
                                id="profileImageUrl"
                                name="profileImageUrl"
                                value={profileImageUrl}
                                onChange={this.handleChange}
                                type="text"
                            /></div>) }
                            <button type="submit" className="btn btn-primary btn-block btn-lg">
                            {buttonText}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthForm;