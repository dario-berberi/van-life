import React from 'react';
import { useLocation, useNavigate, useActionData, Form } from 'react-router-dom';
import { loginUser } from '../api';

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const data = await loginUser({ email, password });
  localStorage.setItem('loggedin', true);
  return data;
}

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = useActionData();
  const from = location.state?.from || '/host';

  if (data?.token) {
    navigate(from, { replace: true });
  }

  return (
    <div className="login-container">
      {location.state?.message && <h3 className="login-error">{location.state.message}</h3>}
      <h1>Sign in to your account</h1>
      <Form className="login-form" action="/login" method="post">
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        {/**use an expression to disable the button only when the expression is true*/}
        <button>Log in</button>
      </Form>
    </div>
  );
}

export default Login;
