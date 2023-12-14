import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import useHttp from "../hooks/use-http";
import useToast from "../hooks/use-toast";

import Row from "../components/Row";
import Form from "../components/Form";
import Input from "../components/Input";
import Toast from "../components/Toast";
import Spinner from "../components/Spinner";
import UploadImage from "../components/UploadImage";
import Autocomplete from "../components/Autocomplete";

const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [organizations, setOrganizations] = useState([]);

  const {
    isLoading: isFetchingOrganizations,
    requestData: fetchOrganizations,
  } = useHttp();

  const { toast, closeToast, createToast } = useToast();

  useEffect(() => {
    const getOrganizations = async () => {
      const response = await fetchOrganizations("organizations/", "GET");
      if (response.isError) return createToast(response.message, "error");
      setOrganizations(response.data);
    };
    getOrganizations();
  }, [createToast, fetchOrganizations]);

  const { control: profileControl, handleSubmit } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      phone: "",
      organization: null,
    },
  });

  const submitHandler = ({ firstname, lastname, phone, organization }) => {
    console.log(firstname, lastname, phone, organization);
    console.log(selectedImage);
  };

  return (
    <>
      <Spinner isLoading={isFetchingOrganizations} />
      <Toast show={toast.show} close={closeToast} severity={toast.severity}>
        {toast.message}
      </Toast>
      <div className="flex flex-col gap-10 min-w-full">
        <Typography className="text-secondary-800" variant="h4">
          My Profile
        </Typography>
        <div className="flex w-full bg-slate-50 flex-col p-5 rounded-md gap-7 border">
          <div className="flex justify-center items-center gap-5">
            <div className="flex flex-col gap-5 justify-start">
              <UploadImage pickImage={setSelectedImage} />
              <Typography
                className="text-slate-500 w-52 text-center"
                variant="caption"
              >
                Allowed *.jpg, *.jpeg or *.png with max size 3 Mb
              </Typography>
            </div>
            <Form onSubmit={handleSubmit(submitHandler)}>
              <Row>
                <Input
                  control={profileControl}
                  name="firstname"
                  label="Firstname"
                  type="text"
                  rules={{
                    required: "This field is required",
                  }}
                  required
                />
                <Input
                  control={profileControl}
                  name="lastname"
                  label="Lastname"
                  type="text"
                  rules={{
                    required: "This field is required",
                  }}
                  required
                />
              </Row>
              <Input
                control={profileControl}
                name="phone"
                label="Phone Number"
                type="text"
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
                required
              />
              <Autocomplete
                options={organizations}
                label="Select your organization"
                control={profileControl}
                rules={{
                  required: "This field is required!",
                }}
                name="organization"
                required
              />
              <div className="flex justify-end">
                <Button type="submit" variant="contained">
                  Update
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
