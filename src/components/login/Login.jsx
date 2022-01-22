import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../hooks/useUser';

export const Login = () => {
  const userName = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useUser();

  const navigate = useNavigate();
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios
      .post('http://localhost:3000/users/signin', { username: userName, password: password.value })
      .then((response) => {
        setLoading(false);
        user.setUser(response.data.userName);
        user.setToken(response.headers['auth-token']);
        navigate('/userdashboard');
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401) setError(error.response.data.message);
        else setError('Something went wrong. Please try again later.');
      });
  };

  return (
    <div>
      <div>
        Username <br />
        <input type="text" {...userName} autoComplete="new-password" />
      </div>
      <div>
        Password <br />
        <input type="text" {...password} autoComplete="new-password" />
      </div>
      {error && (
        <>
          <small style={{ color: 'red' }}>{error}</small> <br />{' '}
        </>
      )}
      <input
        type="button"
        value={loading ? 'Loading...' : 'Login'}
        onClick={handleLogin}
        disabled={loading}
      />
    </div>
  );
};

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange
  };
};
