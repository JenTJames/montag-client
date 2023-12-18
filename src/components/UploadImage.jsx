import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { IoCamera } from "react-icons/io5";

const UploadImage = ({ pickImage, defaultImage }) => {
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (defaultImage) setPreviewImage(defaultImage);
  }, [defaultImage]);

  const imageChangeHandler = (event) => {
    const file = event.target.files[0];

    if (file) {
      pickImage(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    const imageInput = document.getElementById("imageInput");
    imageInput.click();
  };

  return (
    <div className="w-full h-full flex flex-col gap-7 justify-center items-center">
      <div className="w-36 h-36 border-2 border-dashed rounded-full p-2">
        <div
          className="cursor-pointer w-full h-full bg-slate-100 rounded-full flex gap-2 flex-col justify-center items-center hover:opacity-80"
          onClick={handleImageClick}
        >
          {!previewImage ? (
            <>
              <IoCamera size={44} color="#94a3b8" />
              <Typography variant="caption" color="#94a3b8">
                Upload Image
              </Typography>
            </>
          ) : (
            <img
              src={previewImage}
              alt="Preview"
              className="rounded-full w-full h-full object-cover"
            />
          )}
        </div>
        <input
          type="file"
          name="avatar"
          hidden={true}
          id="imageInput"
          accept="image/*"
          onChange={imageChangeHandler}
        />
      </div>
    </div>
  );
};

UploadImage.propTypes = {
  pickImage: PropTypes.func.isRequired,
  defaultImage: PropTypes.string,
};

export default UploadImage;
