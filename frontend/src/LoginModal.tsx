import Modal from 'react-modal';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import { loginSuccess } from './store/authSlice'; 
import { tryLogin } from './utils/api';

interface LoginModalProps {
    isOpen: boolean
    onRequestClose: () => void;
}
interface ErrorResponse { message: string; }

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onRequestClose }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const mutation = useMutation(tryLogin, {
    onSuccess: (token) => {
      // console.log('Login successful:', token); // Log the JWT
      dispatch(loginSuccess(token));      // Dispatch the login action to store the JWT in Redux
      onRequestClose();                   // Close modal
      navigate('/invoices');              // Navigate to the invoices page
    },
    onError: (error) => {
      const axiosError = error as AxiosError<ErrorResponse>;
      // Handle the error
      console.log('Login failed:', axiosError.message);
    },
  });

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({ email, password }); 
  };
  
  const errorMessage = () => {
    const axiosError = mutation.error as AxiosError<ErrorResponse>;

    const statesCode = axiosError.response?.status;
    const errPrefix = 'Sorry, there was an issue signing you in: ⇢ ';
    const errSuffix = (statesCode && statesCode >= 400 && statesCode < 500) ? 'Please try again!' : 'Please try again in a little while!';

    if (axiosError.response) {
      // console.log('Server responded with:', statesCode, axiosError.response.data);  // Server-side validation or other errors
      return `${errPrefix} ${axiosError.response.data?.message}. ${errSuffix}`;
    } else if (axiosError.request) {
      // console.log('No response from server:', statesCode, axiosError.request);      // No response from the server
      return `${errPrefix}  No response from server.  ${errSuffix}`;
    } else {
      // console.log('Error message (misc.):', statesCode, axiosError.message);        // Other errors
      return `${errPrefix} ${axiosError.message}.  ${errSuffix}`;
    }
  };

  const loginModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)', 
    },
  };
  
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={loginModalStyles} shouldCloseOnOverlayClick={false}>
        <h2>Sign In</h2>
        {
          mutation.isLoading && <p>Loading...</p> || 
          mutation.isError && <p>{errorMessage()}</p> ||
          <p>Sign in to access your invoices</p>
        }

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={mutation.isLoading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={mutation.isLoading}
          />
          <button type="submit" disabled={mutation.isLoading}>Login</button>
          <button onClick={onRequestClose} disabled={mutation.isLoading}>Cancel</button>
        </form>
    </Modal>
  );
};

export default LoginModal;