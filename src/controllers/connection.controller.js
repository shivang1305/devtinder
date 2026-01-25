import { ConnectionRequest } from "../models/connectionRequest/connectionRequest.model.js";

const sendConnectionRequest = async (req, res) => {
  try {
    const { toUserId, status } = req.params;
    const fromUserId = req.user._id;

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const connectionRequestData = await connectionRequest.save();
    res.status(201).json({
      message: "Connection request sent successfully",
      data: connectionRequestData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export { sendConnectionRequest };
