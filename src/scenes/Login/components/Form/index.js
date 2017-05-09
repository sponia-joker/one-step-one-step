import React from 'react'
import PropTypes from 'prop-types'
// import Button from 'components/Button';

const Form = ()=> (
  <div className="login-form">
    <form action="#">
      <label for="username">用户名</label>
      <input type="text" name="username" id='username' />
      <label for="password">密码</label>
      <input type="password" name="password" id='password'/>
      <button value='LogIn'/>
    </form> 
  </div>
)
export default Form