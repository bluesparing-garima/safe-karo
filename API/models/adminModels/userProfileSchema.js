import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  docName: { type: String, required: true },
  file: { type: String, required: true },
});

const userProfileSchema = new mongoose.Schema({
  // fields which should be in userProfile.
  branchName: { type: String, trim: true },
  role: { type: String, trim: true },
  headRMId: { type: String, trim: true },
  headRM: { type: String, trim: true },
  bankName: { type: String, trim: true },
  IFSC: { type: String, trim: true },
  accountHolderName: { type: String, trim: true },
  accountNumber: { type: String, trim: true },
  salary: { type: Number, trim: true },

  // fields which are in partners
  password: { type: String, trim: true },
  originalPassword: { type: String },
  wallet: { type: Number, trim: true, default: 0 },

  // fields which are common.
  partnerId: { type: String, unique: true },
  fullName: { type: String, trim: true },
  phoneNumber: { type: String, trim: true },
  email: { type: String, trim: true, unique: true },
  dateOfBirth: { type: Date, trim: true },
  gender: { type: String, trim: true },
  address: { type: String, trim: true },
  pincode: { type: String, trim: true },
  isActive: { type: Boolean, default: true },
  document: [DocumentSchema],
  createdBy: { type: String, trim: true },
  updatedBy: { type: String, default: null },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: null },
});

const UserModel = mongoose.model("UserProfile", userProfileSchema);

export default UserModel;
