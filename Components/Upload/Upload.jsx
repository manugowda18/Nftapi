import React from "react";
import Image from "next/image";

import { Delete, UploadIcon, File } from "../SVG";
import Style from "./Upload.module.css";

const Upload = ({ onImageChange, display, retrieveFile }) => {
  return (
    <div class={Style.container}>
      <div class={Style.header}>
        {display == null ? (
          <>
            <UploadIcon />
            <p>Browse File to upload !</p>
          </>
        ) : (
          <p>
            <Image
              class={Style.image}
              src={display}
              alt="image"
              width={200}
              height={200}
            />
          </p>
        )}
      </div>
      <label htmlFor="file" class={Style.footer}>
        <File />
        <p>No Selected File</p>
        <Delete />
      </label>
      <input
        id="file"
        onChange={(e) => (onImageChange(e), retrieveFile(e))}
        className={Style.file}
        type="file"
      />
    </div>
  );
};

export default Upload;
