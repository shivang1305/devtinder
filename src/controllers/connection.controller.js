import { ConnectionRequest } from "../models/connectionRequest/connectionRequest.model.js";
import { User } from "../models/user/user.models.js";
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

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "Recipient user not found" });
    }

    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId }, // sending req to same user again
        { fromUserId: toUserId, toUserId: fromUserId }, // reverse request exists
      ],
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Connection request already exists between these users",
      });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const connectionRequestData = await connectionRequest.save();
    res.status(201).json({
      message: "Connection request sent: " + status,
      data: connectionRequestData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export { sendConnectionRequest };
