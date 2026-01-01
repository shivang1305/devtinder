import { userProfileEditValidator } from "../validators/user.validators.js";

const getProfile = async (req, res) => {
  const user = req.user;
  res.status(201).json({
    message: "Profile fetched successfully",
    data: user,
  });
};

const editProfile = async (req, res) => {
  try {
    if (!userProfileEditValidator(req)) {
      throw new Error("Invalid fields in update");
    }

    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.status(200).json({
      message: "Profile updated successfully",
      data: loggedInUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating profile",
      error: err.message,
    });
  }
};

export { getProfile, editProfile };
