import { Button, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="w-full h-screen flex justify-center bg-gray-200">
      <div className="w-1/3 flex flex-col items-center justify-center space-y-12 bg-white my-20 rounded-3xl">
        <div className="text-5xl font-black">Register</div>
        <div className="w-full px-20 flex flex-col space-y-6">
          <div>
            <div className="font-black">Full-name</div>
            <Input
              type="email"
              placeholder="Enter name"
              focusBorderColor="green.300"
            />
          </div>
          <div>
            <div className="font-black">Email</div>
            <Input
              type="email"
              placeholder="Enter email"
              focusBorderColor="green.300"
            />
          </div>
          <div>
            <div className="font-black">Password</div>
            <Input
              type={"password"}
              placeholder="Enter password"
              focusBorderColor="green.300"
            />
          </div>
          <div>
            <div className="font-black">Re-password</div>
            <Input
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
