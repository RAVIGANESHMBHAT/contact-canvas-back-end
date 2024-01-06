import { Schema, model } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      first: {
        type: String,
        required: true,
      },
      middle: String,
      last: String,
    },
    avatar: String, // cloudinary url

    company: String,
    department: String,
    jobTitle: String,

    phoneNumbers: [
      {
        number: {
          type: String,
          required: true,
        },
        label: String,
      },
    ],
    emailIds: [
      {
        address: {
          type: String,
          lowercase: true,
          trim: true,
        },
        label: String,
      },
    ],
    addresses: [
      {
        value: String,
        label: String,
      },
    ],
    websites: [String],
    significantDates: [
      {
        date: String,
        label: String,
      },
    ],
    relationships: [
      {
        person: String,
        relationship: String,
      },
    ],
    notes: String,
    tags: {
      type: [String],
    },
    customFields: [
      {
        label: String,
        value: String,
      },
    ],
  },
  { timestamps: true }
);

// export const Contact = model("Contact", contactSchema);

export const getContactModel = (userId) =>
  model(`${userId}_Contact`, contactSchema);
