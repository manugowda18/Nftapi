import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";


import {
  Card,
  Upload,
  Button,
  Profile,
  Header,
  Notification,
  Logo,
  Filter,
  Form
} from "../Components";

import { useStateContext } from "../Context/NFTs";
import images from "../Components/Image/client";


const index = () => {

  const {
    address,
    connect,
    disconnect,
    contract,
    userBalance,
    UploadImage,
    getUploadedImages,
    setLoading,
    loading,
    //api
    getAllNftsAPI,
  } = useStateContext();
  const [openProfile, setOpenProfile] = useState(false);
  const [closeForm, setCloseForm] = useState(true);
  const [file, setFile] = useState(null);
  const [display, setDisplay] = useState(null);
  const [notification, setNotification] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [activeSelect, setActiveSelect] = useState("Old Images");
  const [imagesCopy, setImagesCopy] = useState([]);


  //Get Dta
  const oldImages = [];

  const fetchImages = async () => {
    const images = await getUploadedImages();
    setAllImages(images);

    //API NFTS
    const apiImages = await getAllNftsAPI();
  };

  useEffect(() => {
    if (contract) fetchImages();
  }, [address, contract]);

  if (allImages.length == 0) {
    console.log("Loading...");
  } else {
    allImages.map((el) => oldImages.push(el));
  }

  //Image Data
  const [category, setCategory] = useState("");
  const [imageInfo, setImageInfo] = useState({
    title: "",
    discription: "",
    email: "",
    category: "",
    image: ""
  });

  const handleFormFieldChange = (fieldName, e) => {
    setImageInfo({ ...imageInfo, [fieldName]: e.target.value })
  }

  //Upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCloseForm(false);
    setLoading(true);

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "3862d7e6ad21d9a8bdeb",
            pinata_secret_key: "a2141210ce462ebe079a9368951c5414f1c123f27161e14c6f4eee3172642d2e",
            "Content-Type": "multipart/form-data",
          },
        });
        const image = `https://api.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        await UploadImage({
          ...imageInfo,
          image: image,
          category: category
        });
        setFile(null);
      } catch (error) {
        console.log(error);
      }
    }
    setFile(null);
  };

  //retrieve
  const retrieveFile = (e) => {
    const data = e.target.files[0];

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    e.preventDefault();
  };

  //take image
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setDisplay(URL.createObjectURL(event.target.files[0]));
    }
  };



  return (
    <div className="home">
      <Header notification={notification} setNotification={setNotification} />
      <div className="header">
        <h1>Create 1000 NFTs for Free</h1>
      </div>
      {/* upload */}
      <div className="upload">
        <Upload
          onImageChange={onImageChange}
          display={display}
          address={address}
          retrieveFile={retrieveFile}
        />
        <div className="upload-info">
          <h1>Welcome to NFTs IPFs Upload</h1>
          <p>Our products help you securely distribute any type of media at scale-freeing you from restrictive platforms,middlemen,and algorithms that limit your creative agency</p>
          <div className="avatar">
            <Button
              address={address}
              disconnect={disconnect}
              connect={connect}
              file={file}
            />
            {address && (
              <p>
                <Image
                  className="avatar_img"
                  src={images.client1}
                  width={40}
                  height={40}
                  onClick={() => setOpenProfile(true)}
                />
              </p>
            )}
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <h1 className="subheading">All Nfts of Marketplace</h1>
      {/* Card */}
      {allImages.length == 0 ? (
        <Logo />
      ) : allImages == undefined ? (
        <h1>No images</h1>
      ) : (
        <>
          <Filter
            setImagesCopy={setImagesCopy}
            imagesCopy={imagesCopy}
            setAllImages={setAllImages}
            allImages={allImages}
            oldImages={oldImages}
            activeSelect={activeSelect}
            setActiveSelect={setActiveSelect}
          />
          <div className="card">
            {allImages.map((image, i) => (
              <Card
                key={i + 1}
                index={i}
                image={image}
                setNotification={setNotification}
              />
            ))}
          </div>
        </>
      )}
      {/* Notification */}
      {notification != "" && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}
      {/* Profile */}
      {openProfile && (
        <div className="profile">
          <Profile
            setOpenProfile={setOpenProfile}
            userBalance={userBalance}
            address={address}
          />
        </div>
      )}
      {/* Loader */}
      {loading && (
        <div className="loader">
          <Logo />
        </div>
      )}
      {/* form */}
      {file && closeForm && (
        <div className="form">
          <div className="form_inner">
            <Form
              setFile={setFile}
              setDisplay={setDisplay}
              handleFormFieldChange={handleFormFieldChange}
              handleSubmit={handleSubmit}
              setCategory={setCategory}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default index;

//5:10