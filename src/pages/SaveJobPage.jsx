import { useEffect } from "react";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
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

import Form from "../components/Form";
import Toast from "../components/Toast";
import Input from "../components/Input";
import Switch from "../components/Switch";
import Spinner from "../components/Spinner";
import Checkbox from "../components/Checkbox";
import SplitForm from "../components/SplitForm";
import RadioGroup from "../components/RadioGroup";
import Datepicker from "../components/Datepicker";
import Autocomplete from "../components/Autocomplete";
import Page from "../components/Page";

const SaveJobPage = () => {
  // const navigate = useNavigate();

  const { get: getJobFamilies, setData: setJobFamilies } = useData();
  const { get: getSkills, setData: setSkills } = useData();
  const { get: getLocations, setData: setLocations } = useData();
  const { get: getPerks, setData: setPerks } = useData();

  const { control: jobControl, watch, setValue, handleSubmit } = useForm();

  const { toast, createToast, closeToast } = useToast();

  const { requestData: fetchJobFamilies, isLoading: isFetchingJobFamilies } =
    useHttp();
  const { requestData: fetchSkills, isLoading: isFetchingSkills } = useHttp();
  const { requestData: fetchLocations, isLoading: isFetchingLocations } =
    useHttp();
  const { requestData: fetchPerks, isLoading: isFetchingPerks } = useHttp();
  const { requestData: createJob, isLoading: isCreatingJob } = useHttp();

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

  const findSkills = async (jobFamily) => {
    setValue("skills", []);
    if (!jobFamily) return setSkills([]);
    const response = await fetchSkills("skills?jobFamilyId=" + jobFamily?.id);
    if (response.isError) return createToast(response.message, "error");
    setSkills(response.data);
  };

  const skills = watch("skills", []);

  const makeJob = (job) => {
    return {
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

  const createJobHandler = async (data) => {
    const job = makeJob(data);
    const response = await createJob("jobs", "POST", job);
    if (response.isError) return createToast(response.message, "error");
    createToast("Job created successfully", "success");
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
          isCreatingJob
        }
      />
      <Toast show={toast.show} close={closeToast} severity={toast.severity}>
        {toast.message}
      </Toast>
      <Page>
        <Typography variant="h4">Create a new Job</Typography>
        <Form onSubmit={handleSubmit(createJobHandler)}>
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
              Create Job
            </LoadingButton>
          </div>
        </Form>
      </Page>
    </>
  );
};

export default SaveJobPage;
