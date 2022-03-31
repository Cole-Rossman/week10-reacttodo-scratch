import { useState } from 'react';
import { signInUser, signupUser } from '../../services/users';
import './Auth.css';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [type, setType] = useState('sign-in');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === 'sign-in') {
        await signInUser(email, password);
      } else {
        await signupUser(email, password);
      }
    } catch (e) {
      setError('Sorry something went wrong, please try again');
    }
  };


  return (
    <div>
      <h1>
        <span className={type === 'sign-in' ? 'active' : ''} onClick={() => setType('sign-in')}>
          Sign In
        </span>
        <span className={type === 'sign-up' ? 'active' : ''} onClick={() => setType('sign-up')}>
          Sign Up
        </span>
      </h1>
      {error && <p>{error}</p>}
      <form className="auth" onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button>Submit</button>
      </form>  
    </div>
  );
}
