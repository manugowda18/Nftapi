import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import {
    useAddress,
    useContract,
    useMetamask,
    useDisconnect,
    useSigner,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
// import { contractABI } from "./contractabi.json";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract("0xCC4b2a7c579AaAb679c10e79cE32E1C71117d289");
    const address = useAddress();
    const connect = useMetamask();
    const disconnect = useDisconnect();
    const signer = useSigner();
    const [userBalance, setUserBalance] = useState();
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            if (signer) {
                const balance = await signer.getBalance();
                const formattedBalance = ethers.utils.formatEther(balance);
                setUserBalance(formattedBalance);
            }
        } catch (error) {
            console.log("Error fetching user balance:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [signer]);

    const UploadImage = async (imageInfo) => {
        const { title, description, email, category, image } = imageInfo;

        try {
            setLoading(true);
            const listingPrice = await contract.call("listingPrice");

            const createNFts = await contract.call(
                "uploadIPFS",
                [address, image, title, description, email, category],
                {
                    value: listingPrice.toString(),
                }
            );

            const response = await axios.post("/api/v1/NFTs", {
                title,
                description,
                category,
                image,
                address,
                email,
            });

            console.log(response);
            console.info("Contract call success:", createNFts);

            setLoading(false);
            window.location.reload();
        } catch (err) {
            console.log("Contract call error:", err);
            setLoading(false);
        }
    };

    const getUploadedImages = async () => {
        try {
            const images = await contract.call("getAllNFTs");
            const totalUpload = await contract.call("imagesCount");
            const listingPrice = await contract.call("listingPrice");

            const allImages = images.map((image, i) => ({
                owner: image.owner,
                title: image.title,
                description: image.description,
                email: image.email,
                category: image.category,
                fundraised: image.fundraised,
                image: image.image,
                imageID: image.id.toNumber(),
                createdAt: image.timestamp.toNumber(),
                listedAmount: ethers.utils.formatEther(listingPrice.toString()),
                totalUpload: totalUpload.toNumber(),
            }));
            return allImages;
        } catch (err) {
            console.log("Error fetching uploaded images:", err);
        }
    };

    const singleImage = async (id) => {
        try {
            const data = await contract.call("getImage", [id]);

            const image = {
                title: data[0],
                description: data[1],
                email: data[2],
                category: data[3],
                fundraised: ethers.utils.formatEther(data[4].toString()),
                creator: data[5],
                imageURL: data[6],
                createdAt: data[7].toNumber(),
                imageId: data[8].toNumber()
            };
            return image;
        } catch (err) {
            console.log("Error fetching single image:", err);
        }
    };

    const donateFund = async ({ amount, Id }) => {
        try {
            console.log("Donating amount:", amount, "to Image ID:", Id);
            const transaction = await contract.call("donateToImage", [Id], {
                value: ethers.utils.parseEther(amount).toString(),
            });
            console.log("Donation transaction:", transaction);
            window.location.reload();
        } catch (err) {
            console.log("Error donating funds:", err);
        }
    };

    const getAllNFTsAPI = async () => {
        try {
            const response = await axios.get("/api/v1/NFTs");
            console.log(response);
        } catch (err) {
            console.log("Error fetching all NFTs from API:", err);
        }
    };

    const getSingleNftsAPI = async (id) => {
        try {
            const response = await axios.get(`/api/v1/NFTs/${id}`);
            console.log(response);
        } catch (err) {
            console.log("Error fetching single NFT from API:", err);
        }
    };

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                disconnect,
                userBalance,
                setLoading,
                loading,
                UploadImage,
                getUploadedImages,
                donateFund,
                singleImage,
                getAllNFTsAPI,
                getSingleNftsAPI,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
