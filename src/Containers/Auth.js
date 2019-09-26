import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './Auth.css';

import instance from '../Utility/auxiliary';
import authInstance from '../Utility/authentication';
import {updateObject} from '../Utility/updateObject';
import axios from 'axios';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          login: true,
          type:'email',
          placeholder: 'Your E-mail Address',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      firstname: {
        elementType: 'input',
        elementConfig: {
          login: false,
          type: 'text',
          placeholder:'FirstName'
        },
        value: '',
        validation: {
          required: true,
          minLength: 2
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'password',
        elementConfig: {
          login: true,
          type:'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
      confirmPassword: {
        elementType: 'input',
        elementConfig: {
          login: false,
          type:'password',
          placeholder: 'Confirm Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup:true,
    errorMessage: null
  }

  toggleAuthModeHandler() {
    this.setState(prevState => ({
      isSignup: !prevState.isSignup
    }))
    this.clearControls();
  }

  clearControls() {
    let controlsCopy = this.state.controls;
    for(var key in controlsCopy) {
      controlsCopy[key].value = ''
    }
    this.setState({
      controls: controlsCopy
    })
  }

  resetPasswordHandler() {
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD_M3vdOf4elHSHpBnVxO6D0vpEIN5wM0U', {requestType: 'PASSWORD_RESET', email: ''})
      .then(res => {
        console.log(res.data);
        this.setState({
          errorMessage: 'check your email for a password reset link'
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  checkValidity = ( value, rules ) => {
      let isValid = true;
      if ( !rules ) {
          return true;
      }

      if ( rules.required ) {
          isValid = value.trim() !== '' && isValid;
      }

      if ( rules.minLength ) {
          isValid = value.length >= rules.minLength && isValid
      }

      if ( rules.maxLength ) {
          isValid = value.length <= rules.maxLength && isValid
      }

      if ( rules.isEmail ) {
          const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
          isValid = pattern.test( value ) && isValid
      }

      if ( rules.isNumeric ) {
          const pattern = /^\d+$/;
          isValid = pattern.test( value ) && isValid
      }

      return isValid;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.loadingStart();
    var data = {};
    for(var key in this.state.controls) {
      if(this.state.controls[key].value && this.state.controls[key].valid) {
        data[key] = this.state.controls[key].value;
      }
    }

    if(this.state.isSignup && data.password !== data.confirmPassword) {
      this.setState({
        errorMessage: 'Passwords do not match'
      })
      this.props.doneLoading();
      throw new Error('Passwords do not match');
    }

    const authData = {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    }

    if(this.state.isSignup) {

      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD_M3vdOf4elHSHpBnVxO6D0vpEIN5wM0U',authData)
      .then(res => {
        this.props.onAuth(res.data.idToken, res.data.localId, res.data.expiresIn)
        this.props.doneLoading();

      })
      .catch(err => {
        console.log(err);
        this.props.doneLoading();
      })
    } else {

      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD_M3vdOf4elHSHpBnVxO6D0vpEIN5wM0U', authData)
      .then(res => {
        console.log(res.data);
        this.props.onAuth(res.data.idToken, res.data.localId, res.data.expiresIn)
        this.props.doneLoading();
      }).catch(err => {
        console.log(err);
        this.props.doneLoading();
      })
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };
    this.setState({controls: updatedControls});
  }

  render() {
    let authRedirect = null;
    if(this.props.validAuth) {
      authRedirect = <Redirect to="/"/>
    }


    const formElementsArray = [];

    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    let form;
    if(this.state.isSignup) {
      form = formElementsArray.map(formElement => {
        return (
          <input
          key={formElement.id}
          type={formElement.config.elementConfig.type}
          placeholder={formElement.config.elementConfig.placeholder}
          elementtype={formElement.config.elementType}
          elementconfig={formElement.config.elementConfig}
          value={formElement.config.value}
          onChange={( event ) => this.inputChangedHandler( event, formElement.id )} />
        )
      })
    } else {
      form = formElementsArray.map(formElement => {
        if( formElement.config.elementConfig.login ) {
          return (
            <input
            key={formElement.id}
            type={formElement.config.elementConfig.type}
            placeholder={formElement.config.elementConfig.placeholder}
            elementtype={formElement.config.elementType}
            elementconfig={formElement.config.elementConfig}
            value={formElement.config.value}
            onChange={( event ) => this.inputChangedHandler( event, formElement.id )} />
          )
        } else {
          return null;
        }
      })
    }

    return (
      <div className="auth">
      {authRedirect}
        <h1>{this.state.isSignup ? 'Register' : 'Login'} </h1>
        <form onSubmit={this.handleSubmit} id="authFormContainer">
          {form}
          <input type="submit" value="submit"/>
        </form>
        <button id='submitButton' onClick={() => this.toggleAuthModeHandler()}>{this.state.isSignup ? "Got an account? Click here to switch to login" : "Don't have an account? Click here to create one"}</button>
        <p style={{color: 'red'}}>{this.state.errorMessage}</p>
        {//// TODO: make a modal for error in signing in
        }
      { /* <a style={{
          textDecoration: 'underline',
          cursor: 'pointer'
        }} onClick={() => this.resetPasswordHandler()}>Click here to reset your password</a> */}
      </div>
    )
  }
}



export default Auth;
