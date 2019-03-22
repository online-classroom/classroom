import React from "react";
import "./InfoContainerStyling.scss";
import { connect } from "react-redux";

const ProfileInfo = props => {
  const { user_id, username, email, password, first_name, last_name } = props;
  return (
    <div className="infoContainer">
      <span>name:</span>
      <p>{first_name} {last_name}</p>
      <span>username:</span>
      <p>{username}</p>
      <span>email:</span>
      <p>{email}</p>
    </div>
  );
};

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
