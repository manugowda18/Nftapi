import React from "react";
import Image from "next/image";
import Link from "next/link";


import Style from "./Card.module.css";
import images from "../Image/client/index";
import imagesNFT from "../Image/index";

const Card = ({ setNotification, image, index }) => {
  return (
    <div class={Style.card}>
      <div class={Style.content}>
        {/* <a href={`/image/${image.imageID}`}> */}
        <a href={`/image/1`}>
          <p>
            {/* <img */}
            <Image
              className={Style.image}
              // src={images.image}
              src={imagesNFT.img1}
              alt="image"
              width={250}
              height={200}
            />
          </p>
        </a>
        <span class={Style.para}>
          <Image
            className={Style.avatar_image}
            // src={images[`client${index + 1}`]}
            src={images[`client1`]}
            width={40}
            height={40}
          />
          <small
            className={Style.para_small}
            onClick={() => (
              setNotification("Successfully copied"),
              // navigator.clipboard.writeText(image.owner)
              navigator.clipboard.writeText("Successfully copied")
            )}
          >
            0xuiyt8734hjgkmbf
            {/* {image.owner.slice(0, 25)}... */}
          </small>
        </span>
        <span>
          {/* CreatedAt:{new Date(image.createdAt * 1000).toDateString()} */}
          Jun 15 2023
          {/* <small className={Style.number}>#{image.imageID}</small> */}
          <small>#1</small>
        </span>
        {/* <small class={Style.para}>{image.description.slice(0, 80)}..</small> */}
        <small class={Style.para}>Lorem ipsum dolor sit amet, consecte.....</small>
        <button
          onClick={() => (
            setNotification("Image Url Successfully copied"),
            // navigator.clipboard.writeText(image.image)
            navigator.clipboard.writeText("Image Url Successfully copied")
          )}
          class={Style.btn}
        >
          Copy URL
        </button>
      </div>
    </div>
  );
};

export default Card;
