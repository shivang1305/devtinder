import { ConnectionRequest } from "../models/connectionRequest/connectionRequest.model.js";

const getPendingConnectionRequests = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUserId,
      status: "like", // to get only pending requests
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "age",
      "gender",
      "photoUrl",
      "bio",
      "interests",
      "gallery",
    ]);

    res.status(200).json({
      message: "Connection requests fetched successfully",
      connections: connectionRequests,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" + error.message });
  }
};

const getUserConnections = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;

    const connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUserId, status: "accept" },
        { toUserId: loggedInUserId, status: "accept" },
      ],
    })
      .populate("fromUserId", ["firstName", "lastName"])
      .populate("toUserId", ["firstName", "lastName"]);

    res.status(200).json({
      message: "User connections fetched successfully",
      connections: connections,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" + error.message });
  }
};

export { getPendingConnectionRequests, getUserConnections };
