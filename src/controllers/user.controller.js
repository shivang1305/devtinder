import { ConnectionRequest } from "../models/connectionRequest/connectionRequest.model.js";
import { USER_PUBLIC_FIELDS } from "../utils/constants.js";

const getPendingConnectionRequests = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUserId,
      status: "like", // to get only pending requests
    }).populate("fromUserId", USER_PUBLIC_FIELDS);

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
      .populate("fromUserId", USER_PUBLIC_FIELDS)
      .populate("toUserId", USER_PUBLIC_FIELDS);

    const userConnections = connections.map((connection) => {
      if (connection.fromUserId._id.toString() === loggedInUserId) {
        return {
          _id: connection._id,
          user: connection.toUserId,
          connectedAt: connection.updatedAt,
        };
      } else {
        return {
          _id: connection._id,
          user: connection.fromUserId,
          connectedAt: connection.updatedAt,
        };
      }
    });

    res.status(200).json({
      message: "User connections fetched successfully",
      connections: userConnections,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" + error.message });
  }
};

export { getPendingConnectionRequests, getUserConnections };
