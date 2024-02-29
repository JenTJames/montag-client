import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Bullet from "./Bullet";

const BulletContainer = ({ data }) => {
  const [bullets, setBullets] = useState([]);

  useEffect(() => {
    if (data) {
      const points = data.split(".");
      setBullets(points);
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-2 ml-5">
      {bullets.map((bullet, index) => (
        <Bullet key={index}>{bullet}</Bullet>
      ))}
    </div>
  );
};

BulletContainer.propTypes = {
  data: PropTypes.string,
};

export default BulletContainer;
