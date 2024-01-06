import {
  addContact,
  getAllContacts,
} from "../controllers/contact.controller.js";

import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/:userId/new")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), addContact);

router.route("/:userId").get(getAllContacts);

export default router;
