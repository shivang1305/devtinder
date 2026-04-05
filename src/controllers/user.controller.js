import { ConnectionRequest } from "../models/connectionRequest/connectionRequest.model.js";
import { User } from "../models/user/user.models.js";
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

const userFeed = async (req, res) => {
  // Implementation for user feed goes here
  // all the profiles suggestions should be based on user preferences (gender, age, location, interests, etc.)
  // user should not see his own profile in the feed
  // user should not see profiles of users he has already liked/disliked/connected with

  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  limit = Math.min(limit, 50); // to prevent too large limit
  const skip = (page - 1) * limit;

  const connections = await ConnectionRequest.find({
    $or: [{ fromUserId: req.user.id }, { toUserId: req.user.id }],
  }).select(["fromUserId", "toUserId"]);

  const hideUsersFromFeed = new Set();

  connections.forEach((connection) => {
    hideUsersFromFeed.add(connection.fromUserId.toString());
    hideUsersFromFeed.add(connection.toUserId.toString());
  });

  const usersToShowInFeed = await User.find({
    $and: [
      { _id: { $nin: Array.from(hideUsersFromFeed) } },
      { _id: { $ne: req.user.id } },
    ],
  })
    .select(USER_PUBLIC_FIELDS)
    .limit(limit)
    .skip(skip);

  res.status(200).json({
    data: usersToShowInFeed,
    message: "User feed fetched successfully",
  });
};

export { getPendingConnectionRequests, getUserConnections, userFeed };
