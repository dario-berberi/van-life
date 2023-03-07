import React from 'react';
import { 
  useLocation, 
  useNavigate, 
  useNavigation, 
  useActionData, 
  Form } from 'react-router-dom';
import { loginUser } from '../api';

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  try{
    const data = await loginUser({ email, password });
    localStorage.setItem('loggedin', true);
    return data;
  } catch(err){
    return{
      error: err.message
    }
  }
}

function Login() {
  const data = useActionData();
  const location = useLocation();
  const navigate = useNavigate();
  const navigation = useNavigation()
  
  const from = location.state?.from || '/host';
  
  const {state: status} = navigation;

  React.useEffect(() => {
    if (data?.token) {
      navigate(from, { replace: true });
    }
  },[data, from, navigate])

  return (
    <div className="login-container">
      {location.state?.message && <h3 className="login-error">{location.state.message}</h3>}
      <h1>Sign in to your account</h1>
      {data?.error && <h4 className="login-error">{data.error}</h4>}
      <Form className="login-form" action="/login" method="post">
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        {/**use an expression to disable the button only when the expression is true*/}
        <button disabled={status === "submitting"}>
          {status === "submitting" 
            ? "Loging in..."
            :"Log in"
          }
          </button>
      </Form>
    </div>
  );
}

export default Login;
