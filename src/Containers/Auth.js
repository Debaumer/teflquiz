import React, {Component} from 'react';
import './Auth.css';

class Auth extends Component {
  state = {
    login: false,
    form: {

    }
  }

  toggleAuthModeHandler() {
    this.setState(prevState => ({
      login: !prevState.login
    }))
  }

  clearFormInputs() {

  }

  createFormInputs() {

  }

  authSubmitHandler(e) {
    e.preventDefault();
  }

  inputChangedHandler() {

  }

  render() {

    const formStyle = {
      margin: '0 auto',
      padding: '50px',
      display: 'flex',
      flexFlow: 'nowrap column',
      width: '250px',
      height: '180px',
      alignItems: 'space-between',
      justifyContent: 'center'
    }

    const authSwitchStyle = {
      padding: '10px',
      width: '100px',
      height: '100px',
      borderRadius: '20px'
    }

    let form = (
      <form style={formStyle} autocomplete="off">
        <input required type="email" name="email" placeholder="Email" />
        <input required type="text" name="firstName" placeholder="first name" />
        <input type="password" name="password" placeholder="password" />
        <input required type="password" name="confirmPassword" placeholder="confirm password" />
        <input type="submit" value="register"/>

      </form>
    )

    if(this.state.login) {
      form = (
        <form style={formStyle} autocomplete="off">
          <input required type="email" name="email" placeholder="email" />
          <input required type="password" name="password" placeholder="password" />
          <input type="submit" value="log in"/>
        </form>
      )
    }

    return(
      <div className="Auth">
        <h1>{this.state.login ? 'Login' : 'Register'} </h1>
        <div className="authFormContainer">
          {form}
        </div>
        <button style={authSwitchStyle} onClick={() => this.toggleAuthModeHandler()}>{this.state.login ? "Don't have an account? Click here to create one" : "Click here to log in"}</button>
      </div>
    )
  }
}



export default Auth;
