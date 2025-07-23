export const healthcheck = (req, res) => {
  res
    .status(200)
    .json({ status: 200, health: "ok", message: "Server is running" });
};
