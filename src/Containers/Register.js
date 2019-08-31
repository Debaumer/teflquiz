import React, {Component} from 'react';
import instance from '../Utility/auxiliary';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let display = ''
    if(this.props.hide) {
      display = 'none'
    }
    const formStyle = {
      display: 'flex',
      flexFlow: 'nowrap column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '20px',
      display: display
    }

    return (
      <div>
        <form  autoComplete="off" style={formStyle} onSubmit={this.props.submit} className="register">
          <label htmlFor="firstname">Please Enter your first name</label>
          <p style={{color: 'red'}}>{this.props.error}</p>
          <input style={{
            borderRadius: '20px',
            border: '1px black solid',
            padding: '5px'
          }} name="firstname" type='text' placeholder='first name'/>
          <input style={{
            padding: '5px',
            borderRadius: '5px',
            border: '1px black solid',
            margin: '20px',
            cursor: 'pointer'
          }} type="submit" value="start quiz"/>
        </form>
      </div>
    );
  }
}

export default Register;
