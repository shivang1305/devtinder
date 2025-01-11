const adminAuth = (req, res, next) => {
  console.log("Admin Auth is getting checked...");
  const token = "abc";
  const isAdminAuth = token === "xyz";

  if (isAdminAuth) next();
  else res.status(401).send("Unauthorized Request");
};

const userAuth = (req, res, next) => {
  console.log("User Auth is getting checked...");
  const token = "xyz";
  const isUserAuth = token === "xyz";

  if (isUserAuth) next();
  else res.status(401).send("Unauthorized Request");
};

module.exports = { adminAuth, userAuth };
