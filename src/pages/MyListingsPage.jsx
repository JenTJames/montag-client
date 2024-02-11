import { useEffect, useContext } from "react";
import { Typography } from "@mui/material";

import useData from "../hooks/use-data";
import useHttp from "../hooks/use-http";
import useToast from "../hooks/use-toast";
import AuthContext from "../store/auth-context";

import Page from "../components/Page";
import Toast from "../components/Toast";
import Spinner from "../components/Spinner";
import PaginationContainer from "../components/PaginationContainer";
import Job from "../components/Job";

const MyListingsPage = () => {
  const authContext = useContext(AuthContext);

  const { setData: setJobs, get: getJobs } = useData();

  const { toast, closeToast, createToast } = useToast();

  const { isLoading: isFetchingJobListings, requestData: fetchJobListings } =
    useHttp();

  useEffect(() => {
    const findJobListings = async () => {
      const response = await fetchJobListings("users/1/jobs");
      if (response.error) return createToast(response.error.message, "error");
      setJobs(response.data);
    };
    findJobListings();
  }, [fetchJobListings, createToast, authContext, setJobs]);

  return (
    <>
      <Spinner isLoading={isFetchingJobListings} />
      <Toast show={toast.show} close={closeToast} severity={toast.severity}>
        {toast.message}
      </Toast>
      <Page>
        <Typography variant="h4">My Listings</Typography>
        <PaginationContainer total={getJobs()?.length}>
          {getJobs()?.map((job) => (
            <Job key={job?.id} job={job} />
          ))}
        </PaginationContainer>
      </Page>
    </>
  );
};

export default MyListingsPage;
