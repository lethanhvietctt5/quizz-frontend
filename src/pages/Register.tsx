import { Button, Input, useToast } from "@chakra-ui/react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Register() {
  const fullnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repasswordRef = useRef<HTMLInputElement>(null);

  const toast = useToast();
  const navigate = useNavigate();

  async function handleRegiser() {
    const fullname = fullnameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const repassword = repasswordRef.current?.value;

    if (!fullname || !email || !password || !repassword) {
      toast({
        title: "Register failed.",
        description: "Please enter all field.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (password !== repassword) {
      toast({
        title: "Register failed.",
        description: "Password is not match.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    const res = await api.post("/register", {
      email: email,
      password: password,
      name: fullname,
    });

    if (res.status === 200) {
      toast({
        title: "Register successful.",
        description: "Let login to new account.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      navigate("/login");
      return;
    }

    toast({
      title: "Register failed.",
      description: "Something was wrong.",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  }

  return (
    <div className="w-full h-screen flex justify-center bg-gray-200">
      <div className="w-1/3 flex flex-col items-center justify-center space-y-12 bg-white my-20 rounded-3xl">
        <div className="text-5xl font-black">Register</div>
        <div className="w-full px-20 flex flex-col space-y-6">
          <div>
            <div className="font-black">Full-name</div>
            <Input
              ref={fullnameRef}
              type="text"
              placeholder="Enter name"
              focusBorderColor="green.300"
            />
          </div>
          <div>
            <div className="font-black">Email</div>
            <Input
              ref={emailRef}
              type="email"
              placeholder="Enter email"
              focusBorderColor="green.300"
            />
          </div>
          <div>
            <div className="font-black">Password</div>
            <Input
              ref={passwordRef}
              type={"password"}
              placeholder="Enter password"
              focusBorderColor="green.300"
            />
          </div>
          <div>
            <div className="font-black">Re-password</div>
            <Input
              ref={repasswordRef}
              type={"password"}
              placeholder="Enter password again"
              focusBorderColor="green.300"
            />
          </div>

          <Button
            backgroundColor="green.600"
            colorScheme="green"
            color="white"
            size="md"
            onClick={handleRegiser}
          >
            Register
          </Button>
        </div>
        <div className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login">
            <span className="font-bold text-green-500 cursor-pointer">
              Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
