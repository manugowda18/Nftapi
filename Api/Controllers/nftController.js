const NFT = require("../Model/nftModel");

exports.getAllNfts = async (req, res, next) => {
    try {
        const nfts = await NFT.find();

        // Send Response
        res.status(200).json({
            status: "success",
            results: nfts.length,
            data : {
                nfts,
            },
        });
    } catch (error) {
        next(error);
    }
};

exports.getNft = async (req, res, next) => {
    try {
        const nft = await NFT.findById(req.params.id);

        res.status(200).json({
            status: "success",
            data:{
                nft,
            },
        });
    } catch (error) {
        next(error);
    }
};

exports.createNft = async (req, res, next) => {
    try {
        console.log(req.body);

        const newNft = await NFT.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                nft: newNft,
            },
        });
    } catch (error) {
        next(error);
    }
};
