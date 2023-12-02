import { useContext } from "react";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

import Image from "../assets/login.svg";
import Brand from "../assets/brand.svg";
import useHttp from "../hooks/use-http";
import useToast from "../hooks/use-toast";
import AuthContext from "../store/auth-context";

import Card from "../components/Card";
import Form from "../components/Form";
import Link from "../components/Link";
import Toast from "../components/Toast";
import Input from "../components/Input";

const LoginPage = () => {
  const { setUser } = useContext(AuthContext);

  const { control: loginControl, handleSubmit } = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const { toast, closeToast, createToast } = useToast();

  const { isLoading: isAuthenticatingUser, requestData: authenticateUser } =
    useHttp();

  const submitHandler = async ({ identifier, password }) => {
    if (!identifier || !password)
      return createToast("Invalid email or password", "error");
    const response = await authenticateUser("users/authenticate", "POST", {
      identifier,
      password,
    });
    if (response.isError) {
      const message =
        response.error.response.status === 401
          ? "Invalid Credentials"
          : response.message;
      return createToast(message, "error");
    }
    localStorage.setItem("userId", response.data.id);
    setUser({
      id: response.data.id,
      firstname: response.data.firstname,
      lastname: response.data.lastname,
      email: response.data.email,
    });
    alert("Logged in!");
  };

  return (
    <>
      <Toast show={toast.show} close={closeToast} severity={toast.severity}>
        {toast.message}
      </Toast>
      <div className="w-screen h-screen flex">
        <div className="flex flex-col gap-4 flex-1 bg-gradient-to-tl from-violet-500 to-indigo-200 h-screen justify-center items-center rounded-r-md">
          <img className="w-1/2" src={Image} />
          <div className="flex flex-col">
            <Typography
              className="text-gray-100 font-bold text-center"
              variant="h4"
            >
              Your Gateway to Career Opportunities
            </Typography>
            <Typography className="text-gray-100 font-bold" variant="h6">
              We understand the imporatnce of meaningful work in shaping your
              future!
            </Typography>
          </div>
        </div>
        <div className="relative flex flex-col gap-5 flex-1 justify-center items-center">
          <img className="absolute top-5 right-5 w-14" src={Brand} />
          <div className="w-3/5">
            <Card>
              <div className="flex flex-col gap-5">
                <Typography
                  className="text-gray-600 font-regular font-semibold text-2xl text-center"
                  variant="p"
                >
                  Welcome Back!
                </Typography>
                <Typography className="text-gray-500" variant="body2">
                  Continue where you left off by logging in to your account
                </Typography>
              </div>
              <Form onSubmit={handleSubmit(submitHandler)}>
                <Input
                  control={loginControl}
                  name="identifier"
                  label="Email or Phone number"
                  type="text"
                  required
                />
                <Input
                  control={loginControl}
                  name="password"
                  label="Password"
                  type="password"
                  required
                />
                <LoadingButton
                  loading={isAuthenticatingUser}
                  variant="contained"
                  disableElevation
                  type="submit"
                  color="primary"
                  startIcon={<IoCheckmarkDoneCircle size={25} />}
                  size="large"
                >
                  Login
                </LoadingButton>
              </Form>
              <div className="flex justify-center gap-1">
                <Typography className="text-slate-500" variant="body2">
                  Don&apos;t have an account?
                </Typography>
                <Link to="/register">Sign up</Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
