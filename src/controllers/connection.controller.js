import { ConnectionRequest } from "../models/connectionRequest/connectionRequest.model.js";
import { checkValidSendConnectionStatus } from "../utils/helper.js";

const sendConnectionRequest = async (req, res) => {
  try {
    const { toUserId, status } = req.params;
    const fromUserId = req.user._id;

    if (!checkValidSendConnectionStatus(status)) {
      return res
        .status(400)
        .json({ message: "Invalid connection request status", status });
    }

    if (fromUserId.toString() === toUserId.toString()) {
      return res.status(400).json({
        message: "You cannot send connection request to yourself",
      });
    }

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
