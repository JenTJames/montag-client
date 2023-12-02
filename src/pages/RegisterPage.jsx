import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

import Image from "../assets/reg.svg";
import Brand from "../assets/brand.svg";

import useHttp from "../hooks/use-http";
import useToast from "../hooks/use-toast";
import useData from "../hooks/use-data";

import Row from "../components/Row";
import Form from "../components/Form";
import Card from "../components/Card";
import Link from "../components/Link";
import Input from "../components/Input";
import Toast from "../components/Toast";
import Spinner from "../components/Spinner";

const RegisterPage = () => {
  const { get: getRoles, setData: setRoles } = useData();
  const [role, setRole] = useState(0);

  const { isLoading: isFetchingRoles, requestData: fetchRoles } = useHttp();
  const { isLoading: isCreatingUser, requestData: createUser } = useHttp();

  const { handleSubmit, control: registerControl } = useForm({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { toast, closeToast, createToast } = useToast();

  useEffect(() => {
    const initializeRoles = async () => {
      const response = await fetchRoles("roles", "GET");
      if (response.isError) return createToast(response.message, "error");
      setRoles(response.data);
      setRole(response.data[0].id);
    };
    initializeRoles();
  }, [createToast, fetchRoles, setRoles]);

  const validatePassword = (value) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return (
      regex.test(value) ||
      "Password must contain at least 8 characters, including letters and numbers"
    );
  };

  const validateConfirmPassword = (value, { password }) => {
    if (value !== password) return "The entered passwords does not match!";
    return true;
  };

  const roleChangeHandler = (_, newValue) => {
    setRole(newValue);
  };

  const submitHandler = async ({
    firstname,
    lastname,
    email,
    phoneNumber,
    password,
  }) => {
    const selectedRole = getRoles().find((tempRole) => tempRole.id === role);
    const user = {
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
      role: selectedRole,
    };
    const response = await createUser("users/", "POST", user);
    if (response.isError) {
      const message =
        response.error.response.status === 400
          ? response.error.response.data
          : response.message;
      createToast(message, "error");
      return;
    }
    createToast(
      "Your account is created. Please login with your credentials",
      "success"
    );
  };

  return (
    <>
      <Spinner isLoading={isFetchingRoles} />
      <Toast show={toast.show} close={closeToast} severity={toast.severity}>
        {toast.message}
      </Toast>
      <div className="flex w-full">
        <div className="flex flex-col gap-4 flex-1 bg-gradient-to-tl from-violet-500 to-indigo-200 h-screen justify-center items-center rounded-r-md">
          <img className="w-1/2" src={Image} />
          <div className="flex flex-col">
            <Typography className="text-gray-100 font-bold" variant="h4">
              Unlock Opportunities, Forge Careers
            </Typography>
            <Typography className="text-gray-100 font-bold" variant="h6">
              Your gateway to seamless Job Hunting excellence
            </Typography>
          </div>
        </div>
        <div className="relative flex flex-col gap-5 flex-1 justify-center items-center">
          <img className="absolute top-5 right-5 w-14" src={Brand} />
          <div className="w-3/4">
            <Card>
              <div className="flex flex-col gap-1">
                <Typography
                  className="text-gray-600 font-regular font-semibold text-2xl"
                  variant="p"
                >
                  Create an Account
                </Typography>
                <Typography className="text-gray-500" variant="body2">
                  Enter your details below to create your account and get
                  started.
                </Typography>
              </div>
              <Form onSubmit={handleSubmit(submitHandler)}>
                <Row>
                  <Input
                    control={registerControl}
                    name="firstname"
                    label="Firstname"
                    type="text"
                    required
                    rules={{
                      required: "This field is required",
                    }}
                  />
                  <Input
                    control={registerControl}
                    name="lastname"
                    label="Lastname"
                    type="text"
                    required
                    rules={{
                      required: "This field is required",
                    }}
                  />
                </Row>
                <Input
                  control={registerControl}
                  name="phoneNumber"
                  label="Phone Number"
                  type="text"
                  required
                  rules={{
                    required: "This field is required",
                    minLength: {
                      value: 10,
                      message: "Enter a valid phone number",
                    },
                    maxLength: {
                      value: 10,
                      message: "Enter a valid phone number",
                    },
                  }}
                />
                <Input
                  control={registerControl}
                  name="email"
                  label="Email"
                  type="email"
                  required
                  rules={{
                    required: "This field is required",
                  }}
                />
                <Input
                  control={registerControl}
                  name="password"
                  label="Password"
                  type="password"
                  required
                  rules={{
                    required: "This field is required",
                    validate: validatePassword,
                  }}
                />
                <Input
                  control={registerControl}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  required
                  rules={{
                    required: "This field is required",
                    validate: validateConfirmPassword,
                  }}
                />
                <div className="flex items-center justify-between my-2">
                  <Typography className="text-slate-500" variant="body2">
                    Which role best describes you?
                  </Typography>
                  <ToggleButtonGroup
                    color="primary"
                    value={role}
                    exclusive
                    onChange={roleChangeHandler}
                  >
                    {getRoles().map((tempRole) => (
                      <ToggleButton
                        disableRipple
                        key={tempRole.id}
                        value={tempRole.id}
                      >
                        {tempRole.name}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </div>
                <LoadingButton
                  loading={isCreatingUser}
                  variant="contained"
                  disableElevation
                  type="submit"
                  color="primary"
                  startIcon={<IoCheckmarkDoneCircle size={25} />}
                  size="large"
                >
                  Signup
                </LoadingButton>
              </Form>
              <div className="flex justify-center gap-1">
                <Typography className="text-slate-500" variant="body2">
                  Already have an account?
                </Typography>
                <Link to="/login">Login</Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
