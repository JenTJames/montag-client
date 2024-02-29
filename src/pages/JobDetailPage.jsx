import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { IoCalendar } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import {
  FaEdit,
  FaStar,
  FaCheck,
  FaClock,
  FaDollarSign,
  FaCalendarTimes,
  FaPlaneDeparture,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaCrown, FaCalendarMinus } from "react-icons/fa6";

import useHttp from "../hooks/use-http";
import useToast from "../hooks/use-toast";
import AuthContext from "../store/auth-context";
import { convertCamelCaseToSentence } from "../utils/lib";

import Row from "../components/Row";
import Page from "../components/Page";
import Card from "../components/Card";
import Toast from "../components/Toast";
import Spinner from "../components/Spinner";
import FlexAuto from "../components/FlexAuto";
import Typography from "../components/Typography";
import BulletContainer from "../components/BulletContainer";

const JobDetailPage = () => {
  const [job, setJob] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const { jobId } = useParams();

  const { user } = useContext(AuthContext);

  const { toast, closeToast, createToast } = useToast();

  const { requestData: fetchJob, isLoading: isFetchingJob } = useHttp();
  const { requestData: fetchLogo, isLoading: isFetchingLogo } = useHttp();

  useEffect(() => {
    const getOrganizationLogo = async (logoName) => {
      if (!logoName) return;
      const response = await fetchLogo(
        "images?type=organizations&name=" + logoName,
        "GET"
      );
      if (response.isError) return createToast(response.message, "error");
      setImageUrl(response.data);
    };

    const getJob = async () => {
      const response = await fetchJob("jobs/" + jobId);
      if (response.isError) return createToast(response.message, "error");
      setJob(response.data);
      getOrganizationLogo(response.data.postedByUser.organization.logo);
    };
    getJob();
  }, [createToast, fetchJob, fetchLogo, jobId]);

  const renderSalary = (salary, salaryFrequency) => {
    if (!salary || !salaryFrequency) return;
    const amount = salary.toLocaleString("en-IN");
    console.log(amount);
    if (salaryFrequency.toLowerCase() === "hourly") return "$" + amount + "/hr";
    if (salaryFrequency.toLowerCase() === "daily") return "$" + amount + "/day";
    if (salaryFrequency.toLowerCase() === "fortnight")
      return "$" + amount + "/fortnight";
    if (salaryFrequency.toLowerCase() === "monthly")
      return "$" + amount + "/month";
    if (salaryFrequency.toLowerCase() === "annually")
      return "$" + amount + "/year";
  };

  const renderExperience = (experience) => {
    if (!experience) return;
    if (experience === "none") return "None";
    if (experience === "one") return "1 Year";
    if (experience === "two") return "2 Years";
    if (experience === "three") return "3 Years";
    if (experience === "fourPlus") return "Above 4 Years";
  };

  return (
    <>
      <Spinner isLoading={isFetchingJob || isFetchingLogo} />
      <Toast show={toast.show} close={closeToast} severity={toast.severity}>
        {toast.message}
      </Toast>
      <Page>
        <div className="flex gap-3">
          <Card>
            <Row justify="between">
              <Typography variant="h4" bold>
                {job?.title}
              </Typography>
              <Tooltip title="Job Posted By">
                <Chip
                  className="self-end"
                  icon={<FaCrown fontSize={25} className="fill-yellow-400" />}
                  label={
                    job?.postedByUser?.firstname +
                    " " +
                    job?.postedByUser?.lastname
                  }
                />
              </Tooltip>
            </Row>
            <div className="flex flex-1 flex-col gap-3">
              <Typography variant="h6" bold>
                Job Description
              </Typography>
              <Typography variant="body1">{job?.description}</Typography>
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <Typography variant="h6" bold>
                Key Responsibilities
              </Typography>
              <BulletContainer data={job?.responsibilities} />
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <Typography variant="h6" bold>
                Why You Will Love Working Here
              </Typography>
              <BulletContainer data={job?.whyToJoin} />
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <Row justify="between">
                <Typography variant="h6" bold>
                  Hiring For
                </Typography>
                {job?.isJobVisaProvided && (
                  <Chip
                    label="Visa sponsorship available"
                    color="secondary"
                    variant="outlined"
                    icon={<FaPlaneDeparture />}
                  />
                )}
              </Row>
              <Row>
                {job?.locations?.map((location) => (
                  <Chip
                    color="secondary"
                    key={location.id}
                    label={location?.name}
                  />
                ))}
              </Row>
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <Typography variant="h6" bold>
                Required Skills
              </Typography>
              <Row>
                {job?.skills?.map((skill) => (
                  <Chip color="secondary" key={skill.id} label={skill?.name} />
                ))}
              </Row>
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <Typography variant="h6" bold>
                Perks
              </Typography>
              <Row className="flex items-center gap-3">
                {job?.perks?.map((perk) => (
                  <Chip color="secondary" key={perk.id} label={perk?.name} />
                ))}
              </Row>
            </div>
          </Card>
          <div className="flex flex-col gap-3 w-1/4">
            <Card gap="none">
              <Row align="start">
                <Avatar
                  variant="rounded"
                  src={imageUrl}
                  alt={"Organization Image"}
                />
                <FlexAuto>
                  <Row>
                    <Typography variant="h6">
                      {job?.postedByUser?.organization?.name}
                    </Typography>
                    <RiVerifiedBadgeFill
                      className="fill-blue-400"
                      fontSize={25}
                    />
                  </Row>
                  <Typography variant="body2">
                    {job?.postedByUser?.organization?.address}
                  </Typography>
                </FlexAuto>
              </Row>
            </Card>
            <Card gap="small">
              <Row align="start">
                <IoCalendar className="mt-1 fill-sky-500" size={20} />
                <FlexAuto>
                  <Typography bold variant="body-1">
                    Date Posted
                  </Typography>
                  <Typography>
                    {dayjs(job?.createdAt).format("DD MMMM, YYYY")}
                  </Typography>
                </FlexAuto>
              </Row>
              <Row align="start">
                <FaCalendarTimes className="mt-1 fill-red-500" size={20} />
                <FlexAuto>
                  <Typography bold variant="body-1">
                    Expires On
                  </Typography>
                  <Typography>
                    {dayjs(job?.expiresOn).format("DD MMMM, YYYY")}
                  </Typography>
                </FlexAuto>
              </Row>
              <Row align="start">
                <FaClock className="mt-1 fill-teal-500" size={20} />
                <FlexAuto>
                  <Typography bold variant="body-1">
                    Employment Type
                  </Typography>
                  <Typography>
                    {convertCamelCaseToSentence(job?.employmentType)}
                  </Typography>
                </FlexAuto>
              </Row>
              <Row align="start">
                <FaDollarSign className="mt-1 fill-emerald-500" size={20} />
                <FlexAuto>
                  <Typography bold variant="body-1">
                    Offered Salary
                  </Typography>
                  <Typography>
                    {renderSalary(job?.salary, job?.salaryFrequency)}
                  </Typography>
                </FlexAuto>
              </Row>
              <Row align="start">
                <FaStar className="mt-1 fill-amber-500" size={20} />
                <FlexAuto>
                  <Typography bold variant="body-1">
                    Experience
                  </Typography>
                  <Typography>
                    {renderExperience(job?.experienceLevel)}
                  </Typography>
                </FlexAuto>
              </Row>
              <Row align="start">
                <FaCalendarMinus className="mt-1 fill-pink-500" size={20} />
                <FlexAuto>
                  <Typography bold variant="body-1">
                    Work Schedule
                  </Typography>
                  <Typography>{job?.workingSchedule}</Typography>
                </FlexAuto>
              </Row>
            </Card>
            {user?.id === job?.postedByUser?.id ? (
              <>
                <Button variant="contained" startIcon={<FaEdit />}>
                  Edit
                </Button>
                <Button
                  startIcon={<MdDelete />}
                  color="error"
                  variant="outlined"
                >
                  Delete
                </Button>
              </>
            ) : (
              <Button variant="contained" startIcon={<FaCheck />}>
                Apply
              </Button>
            )}
          </div>
        </div>
      </Page>
    </>
  );
};

export default JobDetailPage;
