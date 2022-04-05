import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signInUser, signupUser } from '../../services/users';
import './Auth.css';

export default function Auth({ setCurrentUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [type, setType] = useState('sign-in');

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === 'sign-in') {
        const resp = await signInUser(email, password);
        setCurrentUser(resp.email);
        history.push('/todos');
      } else {
        const resp = await signupUser(email, password);
        setCurrentUser(resp.email);
        history.push('/todos');
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
