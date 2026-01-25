import { ConnectionRequest } from "../models/connectionRequest/connectionRequest.model.js";
import { User } from "../models/user/user.models.js";
import {
  checkValidReviewConnectionStatus,
  checkValidSendConnectionStatus,
} from "../utils/helper.js";

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

const reviewConnectionRequest = async (req, res) => {
  try {
    const { requestId, status } = req.params;

    if (!checkValidReviewConnectionStatus(status)) {
      return res
        .status(400)
        .json({ message: "Invalid connection request review status", status });
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: req.user._id,
      status: "like", // can only review 'like' requests
    });

    if (!connectionRequest) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    connectionRequest.status = status;
    const updatedRequest = await connectionRequest.save();

    res.status(200).json({
      message: "Connection request " + status,
      data: updatedRequest,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export { sendConnectionRequest, reviewConnectionRequest };
