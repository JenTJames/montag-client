import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { IoMdMore } from "react-icons/io";
import { HiEye } from "react-icons/hi2";
import { HiUserGroup } from "react-icons/hi";
import { GoOrganization } from "react-icons/go";
import { TiWarningOutline } from "react-icons/ti";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { FaClock, FaStar, FaMoneyBillAlt, FaCrown } from "react-icons/fa";

import useHttp from "../hooks/use-http";
import useToast from "../hooks/use-toast";
import { convertCamelCaseToSentence } from "../utils/lib";

import Menu from "./Menu";
import IconText from "./IconText";
import MenuItem from "./MenuItem";
import Toast from "./Toast";

const Job = ({ job }) => {
  const [imageUrl, setImageUrl] = useState("");

  const { requestData: fetchOrganizationImage } = useHttp();

  const { toast, closeToast, createToast } = useToast();

  useEffect(() => {
    const getImage = async () => {
      if (job?.postedByUser?.organization?.logo) {
        const response = await fetchOrganizationImage(
          "images?type=organizations&name=" +
            job?.postedByUser?.organization?.logo
        );
        if (response.isError) return createToast(response.message, "error");
        setImageUrl(response.data);
      }
    };
    if (job?.postedByUser?.organization?.logo) getImage();
  }, [job, fetchOrganizationImage, createToast]);

  const renderExperienceLevel = (experienceLevel) => {
    switch (experienceLevel.toLowerCase()) {
      case "three":
        return "3 years";
      default:
        return "Unknown";
    }
  };

  const renderSalary = (salary, salaryFrequency) => {
    switch (salaryFrequency.toLowerCase()) {
      case "hourly":
        return "$" + salary.toLocaleString("en-US") + "/Hour";
      case "daily":
        return "$" + salary.toLocaleString("en-US") + "/Day";
      case "fortnight":
        return "$" + salary.toLocaleString("en-US") + "/fortnight";
      case "monthly":
        return "$" + salary.toLocaleString("en-US") + "/Month";
      case "annual":
        return "$" + salary.toLocaleString("en-US") + "/Annum";
    }
  };

  const renderExpiryChip = () => {
    const today = dayjs();
    const expiryDay = dayjs(job?.expiresOn);
    if (expiryDay.diff(today, "days") <= 3)
      return (
        <Chip
          label="Expiring Soon"
          size="small"
          color="warning"
          icon={<TiWarningOutline />}
        />
      );
  };

  return (
    <>
      <Toast show={toast.show} close={closeToast} severity={toast.severity}>
        {toast.message}
      </Toast>
      <div className="w-1/4 bg-transparent border rounded-md p-3 flex flex-col gap-2 shadow-md">
        <div className="flex justify-between items-center">
          {imageUrl ? (
            <Avatar
              sx={{
                width: 60,
                height: 60,
                borderRadius: 4,
              }}
              src={imageUrl}
              variant="rounded"
            />
          ) : (
            <Avatar
              sx={{
                background: "#7635DC",
                width: 50,
                height: 50,
                borderRadius: 4,
              }}
              variant="rounded"
            >
              <GoOrganization />
            </Avatar>
          )}
          <Menu
            component={
              <Tooltip title="More">
                <IconButton>
                  <IoMdMore />
                </IconButton>
              </Tooltip>
            }
          >
            <MenuItem startIcon={<HiEye color="grey" fontSize={25} />}>
              Preview
            </MenuItem>
            <MenuItem
              startIcon={<MdModeEditOutline color="grey" fontSize={25} />}
            >
              Edit
            </MenuItem>
            <MenuItem
              startIcon={<MdDelete color="red" fontSize={25} />}
              color="danger"
            >
              Delete
            </MenuItem>
          </Menu>
        </div>
        <h6 className="text-base font-semibold">{job?.title}</h6>
        <p className="text-xs text-slate-500">
          Posted on: {dayjs(job?.createdAt).format("DD MMMM YYYY")}
        </p>
        <p className="text-xs text-slate-500">
          Expiring on: {dayjs(job?.expiresOn).format("DD MMMM YYYY")}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HiUserGroup className="text-emerald-500" />
            <p className="text-emerald-500 text-xs font-semibold">
              0 Applicants
            </p>
          </div>
          {renderExpiryChip()}
        </div>
        <Divider variant="dashed" />
        <div className="grid grid-cols-2 gap-y-3">
          <IconText
            icon={<FaStar className="text-slate-500" />}
            text={renderExperienceLevel(job?.experienceLevel)}
          />
          <IconText
            icon={<FaClock className="text-slate-500" />}
            text={convertCamelCaseToSentence(job?.employmentType)}
          />
          <IconText
            icon={<FaMoneyBillAlt className="text-slate-500" />}
            text={renderSalary(job?.salary, job?.salaryFrequency)}
          />
          <IconText
            icon={<FaCrown className="text-slate-500" />}
            text={
              job?.postedByUser?.firstname + " " + job?.postedByUser?.lastname
            }
          />
        </div>
      </div>
    </>
  );
};

Job.propTypes = {
  job: PropTypes.object.isRequired,
};

export default Job;
