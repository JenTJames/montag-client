import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Row from "../components/Row";
import Image from "../assets/reg.svg";
import Form from "../components/Form";
import Card from "../components/Card";
import Link from "../components/Link";
import Input from "../components/Input";

const RegisterPage = () => {
  const { handleSubmit, control: registerControl } = useForm({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const submitHandler = (data) => {
    console.log(data);
  };

  return (
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
      <div className="flex flex-col gap-5 flex-1 justify-center items-center">
        <Card>
          <div className="flex flex-col gap-1">
            <Typography
              className="text-gray-600 font-regular font-semibold text-2xl"
              variant="p"
            >
              Create an Account
            </Typography>
            <Typography className="text-gray-500" variant="body2">
              Enter your details below to create your account and get started.
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
            <Row>
              <Input
                control={registerControl}
                name="password"
                label="Password"
                type="password"
                required
                rules={{
                  required: "This field is required",
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
                }}
              />
            </Row>
            <Button
              variant="contained"
              disableElevation
              type="submit"
              color="primary"
            >
              Submit
            </Button>
          </Form>
          <div className="flex justify-center gap-1">
            <Typography className="text-slate-500" variant="body2">Already have an account?</Typography>
            <Link to="/login">Login</Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
