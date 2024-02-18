import { useEffect, useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";

import useData from "../hooks/use-data";
import useHttp from "../hooks/use-http";
import useToast from "../hooks/use-toast";
import AuthContext from "../store/auth-context";

import Job from "../components/Job";
import Page from "../components/Page";
import Toast from "../components/Toast";
import Spinner from "../components/Spinner";

const CARDS_PER_PAGE = 6;

const MyListingsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState([]);

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

      // set first page
      setPage(
        response.data.length > CARDS_PER_PAGE
          ? response.data.slice(0, CARDS_PER_PAGE)
          : response.data.slice(0, response.data.length)
      );
    };

    findJobListings();
  }, [fetchJobListings, createToast, authContext, setJobs]);

  const createPage = (pageNumber) => {
    const newPage = [...getJobs()].slice(
      pageNumber * CARDS_PER_PAGE - CARDS_PER_PAGE,
      pageNumber * CARDS_PER_PAGE
    );
    setPage(newPage);
  };

  const handlePageChange = (_, value) => {
    createPage(value);
    setCurrentPage(value);
  };

  return (
    <>
      <Spinner isLoading={isFetchingJobListings} />
      <Toast show={toast.show} close={closeToast} severity={toast.severity}>
        {toast.message}
      </Toast>
      <Page>
        <Typography variant="h4">My Listings</Typography>
        <div className="flex flex-col gap-3">
          <div className="flex wrap gap-3 items-center">
            {page.map((job) => (
              <Job key={job?.id} job={job} />
            ))}
          </div>
          <div className="flex justify-end">
            <Pagination
              page={currentPage}
              onChange={handlePageChange}
              count={
                getJobs.length % CARDS_PER_PAGE === 0
                  ? Math.ceil(getJobs().length / CARDS_PER_PAGE)
                  : Math.ceil(getJobs().length / CARDS_PER_PAGE + 1)
              }
              color="primary"
              variant="outlined"
            />
          </div>
        </div>
      </Page>
    </>
  );
};

export default MyListingsPage;
