import React, { Component } from 'react';
import './InfoContainerStyling.scss';
import { connect } from 'react-redux';
import axios from 'axios';

class ProfileInfo extends Component {
  state = {
    user_id: this.props.user_id,
    username: this.props.username,
    email: this.props.email,
    first_name: this.props.first_name,
    last_name: this.props.last_name
  };
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitEdit = () => {
    const { user_id, username, email, first_name, last_name } = this.state;
    axios
      .put(`/info/update/profile`, {
        user_id,
        username,
        email,
        first_name,
        last_name
      })
      .then(res => {
        console.log(res);
      });
  };

  render() {
    const {
      user_id,
      username,
      email,
      // password,
      first_name,
      last_name,
      editActive
    } = this.props;
    return (
      <div>
        {!editActive ? (
          <div className='infoContainer'>
            <span>name:</span>
            <p>
              {first_name} {last_name}
            </p>
            <span>username:</span>
            <p>{username}</p>
            <span>email:</span>
            <p>{email}</p>
          </div>
        ) : (
          <div className='infoContainer'>
            <div className='infoRow'>
              <img
                className='profileImg'
                alt='stuff'
                // src={'https://via.placeholder.com/150'}
                src={'https://img.labnol.org/di/bo.jpg'}
              />
              <button className='submitButton' onClick={this.submitEdit}>
                Submit
              </button>
            </div>
            <div className='infoRow'>
              <div className='infoCol'>
                <span>First Name:</span>
                <p>
                  <input
                    placeholder={first_name}
                    type='text'
                    name='first_name'
                    value={this.state.first_name}
                    onChange={this.handleChange}
                  />
                </p>
                <span>Last Name</span>
                <p>
                  <input
                    placeholder={last_name}
                    type='text'
                    name='last_name'
                    value={this.state.last_name}
                    onChange={this.handleChange}
                  />
                </p>
              </div>
              <div className='infoCol'>
                <span>username:</span>
                <p>
                  <input
                    placeholder={username}
                    type='text'
                    name='username'
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                </p>
                <span>email:</span>
                <p>
                  <input
                    placeholder={email}
                    type='text'
                    name='email'
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const m2p = state => {
  const { user_id, username, email, password, first_name, last_name } = state;
  return {
    user_id,
    username,
    email,
    password,
    first_name,
    last_name
  };
};

export default connect(
  m2p,
  null
)(ProfileInfo);
