import { useCallback, useEffect, useContext } from "react";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

import useData from "../hooks/use-data";
import useHttp from "../hooks/use-http";
import useToast from "../hooks/use-toast";
import {
  EMPLOYMENT_TYPES,
  EXPERIENCE_LEVELS,
  SALARY_INTERVALS,
  WORKING_SCHEDULES,
} from "../utils/global";
import { convertToLowerCamelCase } from "../utils/lib";
import AuthContext from "../store/auth-context";

import Form from "../components/Form";
import Page from "../components/Page";
import Toast from "../components/Toast";
import Input from "../components/Input";
import Switch from "../components/Switch";
import Spinner from "../components/Spinner";
import Checkbox from "../components/Checkbox";
import SplitForm from "../components/SplitForm";
import RadioGroup from "../components/RadioGroup";
import Datepicker from "../components/Datepicker";
import Autocomplete from "../components/Autocomplete";

const SaveJobPage = () => {
  // const navigate = useNavigate();
  const { jobId } = useParams();

  const { user } = useContext(AuthContext);

  const { get: getJobFamilies, setData: setJobFamilies } = useData();
  const { get: getSkills, setData: setSkills } = useData();
  const { get: getLocations, setData: setLocations } = useData();
  const { get: getPerks, setData: setPerks } = useData();

  const {
    control: jobControl,
    watch,
    setValue,
    handleSubmit,
    reset,
  } = useForm();

  const { toast, createToast, closeToast } = useToast();

  const { requestData: fetchJobFamilies, isLoading: isFetchingJobFamilies } =
    useHttp();
  const { requestData: fetchSkills, isLoading: isFetchingSkills } = useHttp();
  const { requestData: fetchLocations, isLoading: isFetchingLocations } =
    useHttp();
  const { requestData: fetchJobById, isLoading: isFetchingJobById } = useHttp();
  const { requestData: fetchPerks, isLoading: isFetchingPerks } = useHttp();
  const { requestData: createJob, isLoading: isCreatingJob } = useHttp();
  const { requestData: updateJob, isLoading: isUpdatingJob } = useHttp();

  // Initializes job families, locations and perks
  useEffect(() => {
    const findJobFamilies = async () => {
      const response = await fetchJobFamilies("jobFamilies");
      if (response.isError) return createToast(response.message, "error");
      setJobFamilies(response.data);
    };
    const findLocations = async () => {
      const response = await fetchLocations("countries");
      if (response.isError) return createToast(response.message, "error");
      setLocations(response.data);
    };
    const findPerks = async () => {
      const response = await fetchPerks("perks");
      if (response.isError) return createToast(response.message, "error");
      setPerks(response.data);
    };
    findJobFamilies();
    findLocations();
    findPerks();
  }, [
    createToast,
    fetchJobFamilies,
    setJobFamilies,
    fetchLocations,
    setLocations,
    fetchPerks,
    setPerks,
  ]);

  const skills = watch("skills", []);

  const findSkills = useCallback(
    async (jobFamily) => {
      setValue("skills", []);
      if (!jobFamily) return setSkills([]);
      const response = await fetchSkills("skills?jobFamilyId=" + jobFamily?.id);
      if (response.isError) return createToast(response.message, "error");
      setSkills(response.data);
    },
    [createToast, fetchSkills, setSkills, setValue]
  );

  // If the Job ID is set in the URL, initialize the inputs
  useEffect(() => {
    const initializeInputsWithJobDetails = async () => {
      const response = await fetchJobById("jobs/" + jobId);
      if (response.isError) return createToast(response.message, "error");
      await findSkills(response.data.jobFamily);
      setValue("title", response.data.title);
      setValue("jobDescription", response.data.description);
      setValue("keyResponsibilities", response.data.responsibilities);
      setValue("whyToJoin", response.data.whyToJoin);
      setValue("employmentType", response.data.employmentType);
      setValue("experienceLevel", response.data.experienceLevel);
      setValue("isJobVisaProvided", response.data.isJobVisaProvided); // TODO: Not Working
      setValue("jobFamily", response.data.jobFamily);
      setValue("skills", response.data.skills);
      setValue("workingSchedule", response.data.workingSchedule);
      setValue("locations", response.data.locations);
      setValue("expiry", dayjs(response.data.expiresOn));
      setValue("salaryInterval", response.data.salaryFrequency);
      setValue("salary", response.data.salary);
      setValue("isSalaryNegotiable", response.data.isSalaryNegotiable); // TODO: Not Working
      response.data.perks.forEach((perk) => {
        setValue(convertToLowerCamelCase(perk.name), true);
      });
    };
    if (jobId) initializeInputsWithJobDetails();
    else reset({});
  }, [jobId, fetchJobById, createToast, setValue, findSkills, reset]);

  const makeJob = (job) => {
    return {
      id: jobId ? +jobId : undefined,
      postedById: user.id,
      title: job?.title,
      description: job?.jobDescription,
      keyResponsibilities: job?.keyResponsibilities,
      whyToJoin: job?.whyToJoin,
      employmentType: job?.employmentType,
      experienceLevel: job?.experienceLevel,
      isJobVisaProvided: job?.isJobVisaProvided,
      jobFamilyId: job?.jobFamily?.id,
      skills: job?.skills,
      workingSchedule: job?.workingSchedule,
      locations: job?.locations,
      expiry: job?.expiry,
      salaryFrequency: job?.salaryInterval,
      salary: job?.salary,
      isSalaryNegotiable: job?.isSalaryNegotiable,
      perks: {
        freeParking: job?.freeParking,
        bonusCommission: job?.bonusCommission,
        paidVacations: job?.paidVacations,
        deviceSupport: job?.deviceSupport,
        cashlessHealthcare: job?.cashlessHealthcare,
        freeTraining: job?.freeTraining,
        healthInsurance: job?.healthInsurance,
        retirementPlans: job?.retirementPlans,
        paidTimeOff: job?.paidTimeOff,
        flexibleWorkSchedule: job?.flexibleWorkSchedule,
      },
    };
  };

  const saveJobHandler = async (data) => {
    const job = makeJob(data);
    let response;
    if (!jobId) response = await createJob("jobs", "POST", job);
    else response = await updateJob("jobs", "PUT", job);
    if (response.isError) return createToast(response.message, "error");
    const toastMessage = jobId
      ? "Job updated successfully"
      : "Job created successfully";
    createToast(toastMessage, "success");
    // navigate("/dashboard");
  };

  return (
    <>
      <Spinner
        isLoading={
          isFetchingJobFamilies ||
          isFetchingSkills ||
          isFetchingLocations ||
          isFetchingPerks ||
          isCreatingJob ||
          isFetchingJobById ||
          isUpdatingJob
        }
      />
      <Toast show={toast.show} close={closeToast} severity={toast.severity}>
        {toast.message}
      </Toast>
      <Page>
        <Typography variant="h4">
          {jobId ? "Update Job" : "Create a new Job"}
        </Typography>
        <Form onSubmit={handleSubmit(saveJobHandler)}>
          <SplitForm title="Details" description="Title, short description">
            <Input
              control={jobControl}
              name="title"
              label="Title"
              type="text"
              placeholder="Ex: Software Engineer..."
              rules={{
                required: "This field is required",
              }}
              required
            />
            <Input
              control={jobControl}
              name="jobDescription"
              label="Job Description"
              type="text"
              placeholder="About the job"
              multiline
              minRows={10}
              rules={{
                required: "This field is required",
              }}
              required
            />
            <Input
              control={jobControl}
              name="keyResponsibilities"
              label="Key Responsibilities"
              type="text"
              placeholder="Key responsibilities of the role day by day"
              multiline
              minRows={10}
              rules={{
                required: "This field is required",
              }}
              required
            />
            <Input
              control={jobControl}
              name="whyToJoin"
              label="Why To Join"
              type="text"
              placeholder="Why the candidate would love working in this role"
              multiline
              minRows={10}
              rules={{
                required: "This field is required",
              }}
              required
            />
          </SplitForm>
          <SplitForm
            title="Job Attributes"
            description="Key attributes of this job"
          >
            <FormControl>
              <FormLabel>Employment Type</FormLabel>
              <RadioGroup
                name="employmentType"
                control={jobControl}
                values={EMPLOYMENT_TYPES}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Experience Level</FormLabel>
              <RadioGroup
                name="experienceLevel"
                control={jobControl}
                values={EXPERIENCE_LEVELS}
              />
            </FormControl>
            <Switch
              control={jobControl}
              label="Job Visa Provided"
              name="isJobVisaProvided"
            />
            <Autocomplete
              required
              name="jobFamily"
              control={jobControl}
              options={getJobFamilies()}
              onChange={findSkills}
              label="Select the Job Family"
              rules={{
                required: "This field is required!",
              }}
            />
            {getSkills().length > 0 ? (
              <Autocomplete
                multiple
                required
                name="skills"
                value={skills}
                control={jobControl}
                options={getSkills()}
                label="Select the relevant skills"
                rules={{
                  required: "This field is required!",
                }}
              />
            ) : null}
            <Autocomplete
              required
              name="workingSchedule"
              control={jobControl}
              options={WORKING_SCHEDULES}
              label="Select the working schedule"
              rules={{
                required: "This field is required!",
              }}
            />
            <Autocomplete
              required
              multiple
              name="locations"
              control={jobControl}
              options={getLocations()}
              label="Select the locations"
              rules={{
                required: "This field is required!",
              }}
            />
            <Datepicker control={jobControl} name="expiry" label="Expiry" />
          </SplitForm>
          <SplitForm
            title="Compensation"
            description="Compensation Details about the job"
          >
            <FormControl>
              <FormLabel>Salary</FormLabel>
              <RadioGroup
                name="salaryInterval"
                control={jobControl}
                values={SALARY_INTERVALS}
              />
            </FormControl>
            <Input
              control={jobControl}
              name="salary"
              label="Salary"
              type="number"
              placeholder="Salary offered for this role"
              rules={{
                required: "This field is required",
              }}
              required
            />
            <Switch
              control={jobControl}
              label="Salary is negotiable"
              name="isSalaryNegotiable"
            />
          </SplitForm>
          <SplitForm
            title="Perks & Benefits"
            description="Key benefits and perks offered for the job"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {getPerks().map((perk) => (
                <Checkbox
                  key={perk?.id}
                  label={perk?.name}
                  control={jobControl}
                  name={convertToLowerCamelCase(perk?.name)}
                />
              ))}
            </div>
          </SplitForm>
          <div className="flex justify-end">
            <LoadingButton
              loading={false}
              variant="contained"
              disableElevation
              type="submit"
              color="primary"
              startIcon={<IoCheckmarkDoneCircle size={25} />}
              size="large"
            >
              {jobId ? "Update Job" : "Create Job"}
            </LoadingButton>
          </div>
        </Form>
      </Page>
    </>
  );
};

export default SaveJobPage;
