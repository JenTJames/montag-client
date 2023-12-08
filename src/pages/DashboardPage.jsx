import Typography from "@mui/material/Typography";
import {
  LuBadgeX,
  LuBadgeCheck,
  LuBadgeHelp,
  LuBadgePlus,
} from "react-icons/lu";

import SummaryCard from "../components/SummaryCard";

const DashboardPage = () => {
  return (
    <>
      <div className="flex flex-col gap-8">
        <Typography
          className="font-semibold text-2xl text-secondary-950"
          variant="title"
        >
          Hi, Welcome Back! 👋
        </Typography>
        <div className="flex justify-between">
          <SummaryCard
            value={0}
            title="Jobs Applied"
            icon={<LuBadgePlus size={50} color="#64748b" />}
            color="#64748b"
            backgroundColor="#cbd5e1"
          />
          <SummaryCard
            value={0}
            title="In Process"
            icon={<LuBadgeHelp size={50} color="#ea580c" />}
            color="#ea580c"
            backgroundColor="#fed7aa"
          />
          <SummaryCard
            value={0}
            title="Offered"
            icon={<LuBadgeCheck size={50} color="#10b981" />}
            color="#10b981"
            backgroundColor="#a7f3d0"
          />
          <SummaryCard
            value={0}
            title="Rejected"
            icon={<LuBadgeX size={50} color="#dc2626" />}
            color="#dc2626"
            backgroundColor="#fecaca"
          />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
