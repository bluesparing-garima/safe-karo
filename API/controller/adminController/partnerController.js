import UserModel from '../../models/adminModels/userProfileSchema.js';

// Helper function to generate Partner ID
const generatePartnerId = async () => {
    const lastUser = await UserProfileModel.findOne({
      partnerId: { $exists: true },
    })
      .sort({ createdOn: -1 })
      .exec();
  
    let newPartnerId = "8717A1";
  
    if (lastUser && lastUser.partnerId) {
      const lastPartnerId = lastUser.partnerId;
      const prefix = lastPartnerId.slice(0, 4); // "8717"
      const suffix = lastPartnerId.slice(4); // "A1", "A2", ..., "A999", "B1", ...
      const letter = suffix[0]; // "A", "B", ...
      let number = parseInt(suffix.slice(1), 10); // 1, 2, ..., 999
  
      number++;
      if (number > 999) {
        number = 1;
        newLetter = String.fromCharCode(letter.charCodeAt(0) + 1);
      } else {
        newLetter = letter;
      }
  
      newPartnerId = `${prefix}${newLetter}${number}`;
    }
  
    return newPartnerId;
  };
  
// Create a new partner
export const createPartner = async (req, res) => {
    try {
        const {fullName, mobileNumber, email, dateOfBirth, gender, password,address,pincode, wallet } = req.body;
        if (!password || !fullName || !mobileNumber || !email || !dateOfBirth || !gender || !address || !pincode || !wallet) {
            return res.status(400).json({ message: 'Missing required fields for partner creation' });
        }
        
        const newPartner = {
            
            fullName, mobileNumber, email, dateOfBirth, gender, password,address,pincode, wallet,
            partnerId: await generatePartnerId()
        };

        const partner = new UserModel(newPartner);
        await partner.save();
        res.status(201).json({ message: 'Partner created successfully', data: partner, status:"success" });
    } catch (error) {
        res.status(500).json({ message: 'Error creating partner', error: error.message });
    }
};

// Get all partners
export const getAllPartners = async (req, res) => {
    try {
        const partners = await UserModel.find({ partnerId: { $exists: true } });
        res.status(200).json({
            message: 'Partners retrieved successfully.',
            data: partners,
            status: "Success"
        });
    } catch (error) {
        console.error("Error retrieving partners:", error);
        res.status(500).json({ message: 'Error retrieving partners', error: error.message });
    }
};

// Get a partner by ID
export const getPartnerById = async (req, res) => {
    try {
        const partner = await UserModel.findById(req.params.id);
        if (!partner || !partner.partnerId) {
            return res.status(404).json({ message: 'Partner not found' });
        }
        res.status(200).json({ message: 'Partner retrieved successfully', data: partner, status:"success" });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving partner', error: error.message });
    }
};

// Update a partner by ID
export const updatePartner = async (req, res) => {
    try {
        const updatedPartner = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPartner || !updatedPartner.partnerId) {
            return res.status(404).json({ message: 'Partner not found' });
        }
        res.status(200).json({ message: 'Partner updated successfully', data: updatedPartner, status:"success"});
    } catch (error) {
        res.status(500).json({ message: 'Error updating partner', error: error.message });
    }
};

// Delete (deactivate) a partner by ID
export const deletePartner = async (req, res) => {
    try {
        const deletedPartner = await UserModel.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
        if (!deletedPartner || !deletedPartner.partnerId) {
            return res.status(404).json({ message: 'Partner not found' });
        }
        res.status(200).json({ message: 'Partner deactivated successfully', data: deletedPartner, status:"success" });
    } catch (error) {
        res.status(500).json({ message: 'Error deactivating partner', error: error.message });
    }
};