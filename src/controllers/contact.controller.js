import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getContactModel } from "../models/contact.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const addContact = asyncHandler(async (req, res) => {
  const {
    name,
    company,
    department,
    jobTitle,
    phoneNumbers,
    emailIds,
    addresses,
    websites,
    significantDates,
    relationships,
    notes,
    tags,
    customFields,
  } = req.body;

  try {
    if (!name?.first) {
      throw new ApiError(400, "Name is a mandatory field");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;

    const avatar = avatarLocalPath
      ? await uploadToCloudinary(
          avatarLocalPath,
          process.env.CLOUDINARY_FOLDER_NAME
        )
      : null;

    const ContactSchema = getContactModel(req.params.userId);

    const newContact = new ContactSchema({
      name,
      avatar: avatar?.url || "",
      company,
      department,
      jobTitle,
      phoneNumbers,
      emailIds,
      addresses,
      websites,
      significantDates,
      relationships,
      notes,
      tags,
      customFields,
    });

    const contact = await newContact.save();

    const createdContact = await ContactSchema.findById(contact._id);

    if (!createdContact) {
      throw new ApiError(
        500,
        "Something went wrong while creating the user contact"
      );
    }

    return res
      .status(201)
      .json(
        new ApiResponse(200, createdContact, "Contact created successfully")
      );
  } catch (error) {
    res.status(error.statusCode).send(error);
  }
});

export const getAllContacts = asyncHandler(async (req, res) => {
  const ContactSchema = getContactModel(req.params.userId);
  // Fetch all contacts from the collection
  const contacts = await ContactSchema.find();

  // Return the contacts as a response
  res.status(200).json({
    success: true,
    data: contacts,
  });
});
