import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import AuthContext from "../store/auth-context";
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
  const [fetchedImage, setFetchedImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [organizations, setOrganizations] = useState([]);

  const { user: currentUser, setUser: setCurrentUser } =
    useContext(AuthContext);

  const {
    isLoading: isFetchingOrganizations,
    requestData: fetchOrganizations,
  } = useHttp();
  const { isLoading: isSavingUser, requestData: saveUser } = useHttp();
  const { isLoading: isSavingUserImage, requestData: saveUserImage } =
    useHttp();
  const { isLoading: isFetchingUserDetails, requestData: fetchUserDetails } =
    useHttp();
  const { isLoading: isFetchingUserImage, requestData: fetchUserImage } =
    useHttp();

  const { toast, closeToast, createToast } = useToast();

  const { control: profileControl, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const getOrganizations = async () => {
      const response = await fetchOrganizations("organizations/", "GET");
      if (response.isError) return createToast(response.message, "error");
      setOrganizations(response.data);
    };

    const getUserImage = async (imageName) => {
      const response = await fetchUserImage(
        "images?type=users&name=" + imageName
      );
      if (!response) {
        createToast("Could not get the business image", "error");
        return;
      }
      setFetchedImage(response.data);
    };

    const getUserDetails = async () => {
      const response = await fetchUserDetails(
        `users?email=${currentUser.email}&organization=true`,
        "GET"
      );
      if (response.isError) return createToast(response.message, "error");
      const user = response.data;
      getUserImage(user.image);
      setValue("firstname", user?.firstname || "");
      setValue("lastname", user?.lastname || "");
      setValue("phoneNumber", user?.phoneNumber || "");
      setValue("organization", user?.organization || null);
    };
    getOrganizations();
    currentUser.email && getUserDetails();
  }, [
    createToast,
    fetchOrganizations,
    fetchUserDetails,
    currentUser.email,
    setValue,
    fetchUserImage,
  ]);

  const saveAvatar = async (user) => {
    const formData = new FormData();
    formData.append("image", selectedImage);
    const endpoint = `users/uploads?id=${user.id}&name=${
      user.firstname + " " + user.lastname
    }&saveType=users`;
    const response = await saveUserImage(endpoint, "POST", formData);
    if (response.isError) {
      return createToast(response.message, "error");
    }
    return response.data;
  };

  const updateHandler = async ({
    firstname,
    lastname,
    phoneNumber,
    organization,
  }) => {
    const user = {
      id: currentUser.id,
      firstname,
      lastname,
      phoneNumber,
      organizationId: organization.id,
    };
    const response = await saveUser("users/", "PUT", user);
    if (response.isError) return createToast(response.message, "error");
    if (!selectedImage)
      return createToast("User details updated successfully!", "success");
    const savedUser = response.data;
    const imageName = await saveAvatar(savedUser);
    setCurrentUser((currentState) => {
      return {
        ...currentState,
        image: imageName,
      };
    });
    createToast("User details updated successfully!", "success");
  };

  return (
    <>
      <Spinner
        isLoading={
          isFetchingOrganizations ||
          isFetchingUserDetails ||
          isSavingUserImage ||
          isSavingUser ||
          isFetchingUserImage
        }
      />
      <Toast show={toast.show} close={closeToast} severity={toast.severity}>
        {toast.message}
      </Toast>
      <div className="flex flex-col gap-10 min-w-full">
        <Typography className="text-secondary-800" variant="h4">
          My Profile
        </Typography>
        <div className="flex w-full bg-slate-50 flex-col p-5 rounded-md gap-7 border">
          <div className="flex justify-center items-center gap-36">
            <div className="flex flex-col gap-5 justify-start">
              <UploadImage
                pickImage={setSelectedImage}
                defaultImage={fetchedImage}
              />
              <Typography
                className="text-slate-500 w-52 text-center"
                variant="caption"
              >
                Allowed *.jpg, *.jpeg or *.png with max size 3 Mb
              </Typography>
            </div>
            <Form onSubmit={handleSubmit(updateHandler)}>
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
                name="phoneNumber"
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
