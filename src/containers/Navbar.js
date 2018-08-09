import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Logo from '../images/warbler-logo.png';
import {logout} from '../store/actions/auth';


class Navbar extends Component {
    
    handleLogout = (e) => {
        e.preventDefault();
        this.props.logout();
    }
    
    render() {
        let {currentUser} = this.props;
        return (
            <nav className='navbar navbar-expand'>
                <div className='container-fluid'>
                    <div className='navbar-header'>
                        <Link to='/' className='navbar-brand'>
                            <img src={Logo} alt='Warbler Home'/>
                        </Link>
                    </div>
                    {currentUser.isAuthenticated
                    ?
                    <ul className='nav navbar-nav navbar-right'>
                        <li>
                            <Link to={`/api/users/${currentUser.user.id}/messages/new`}>
                                New Message
                            </Link>
                        </li>
                        <li>
                            <a onClick={this.handleLogout}>Logout</a>
                        </li>
                    </ul>
                    :
                    <ul className='nav navbar-nav navbar-right'>
                        <li>
                            <Link to='signup'>
                                Signup
                            </Link>
                        </li>
                        <li>
                            <Link to='signin'>
                                Login
                            </Link>
                        </li>
                    </ul>
                    }
                </div>
            </nav>
            );
    }
}

const mapStateToProps = function(state) {
    return {
        currentUser: state.currentUser
    };
};

export default connect(mapStateToProps, {logout})(Navbar);