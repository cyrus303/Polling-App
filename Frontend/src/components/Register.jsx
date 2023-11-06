import React, {useState} from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      username,
      email,
      password,
    };
    try {
      const response = await axios.post(
        'http://localhost:3030/api/users/register',
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Register Component</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Username <br />
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>{' '}
        <br />
        <label>
          Enter Email <br />
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>{' '}
        <br />
        <label>
          Enter Password <br />
          <input
            type="text"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Register;
