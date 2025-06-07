const getProfile = async (req, res) => {
  const user = req.user;
  res.status(201).json({
    message: "Profile fetched successfully",
    data: user,
  });
};

export { getProfile };
