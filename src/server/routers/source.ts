import { Router } from "express";

export const sourceRouter = Router();

const supportedAssets = ["svg", "png", "jpg", "png", "jpeg", "mp4", "ogv"];

const assetExtensionRegex = () => {
  const formattedExtensionList = supportedAssets.join("|");

  return new RegExp(`.+\.(${formattedExtensionList})$`);
};

sourceRouter.get(assetExtensionRegex(), (req, res) => {
  res.redirect(303, `http://localhost:5173/src${req.path}`);
});
