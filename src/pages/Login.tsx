import { Button, Input, useToast } from '@chakra-ui/react';
import { useAppDispatch } from 'hooks';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from 'redux/slices/auth';
import api from '../api';

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function handleLogin() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      toast({
        title: 'Login failed.',
        description: 'Please enter all field.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    const res = await api.post('/auth', {
      email: email,
      password: password,
    });

    if (res.status === 200) {
      dispatch(login(res.data));
      navigate('/library');
      return;
    }

    toast({
      title: 'Login failed.',
      description: 'Something was wrong.',
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'top',
    });
  }

  return (
    <div className="w-full h-screen flex justify-center bg-gray-200 text-[#333333]">
      <div className="w-1/3 flex flex-col items-center justify-center space-y-12 bg-white my-20 rounded-3xl">
        <div className="text-5xl font-black">Login</div>
        <div className="w-full px-20 flex flex-col space-y-6">
          <div>
            <div className="font-black">Email</div>
            <Input ref={emailRef} type="email" placeholder="Enter email" focusBorderColor="green.300" />
          </div>
          <div>
            <div className="font-black">Password</div>
            <Input ref={passwordRef} type={'password'} placeholder="Enter password" focusBorderColor="green.300" />
          </div>

          <div className="text-sm">
            Forgot password?{' '}
            <span className="font-bold text-green-500 underline underline-offset-4 cursor-pointer">
              Reset your password
            </span>
          </div>

          <Button backgroundColor="green.600" colorScheme="green" color="white" size="md" onClick={handleLogin}>
            Login
          </Button>
        </div>
        <div className="text-sm text-center">
          Don't have an account?{' '}
          <Link to="/register">
            <span className="font-bold text-green-500 cursor-pointer">Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
