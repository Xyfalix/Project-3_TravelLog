const jwt = require("jsonwebtoken");

const checkToken = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    res.status(401).json({ err: "No token in header" });
    return;
  }

  const authHeaderArray = authHeader.split(" ");
  const token = authHeaderArray[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    res.locals.userId = decoded._id;
    // res.json({ decoded });
    next();
  } catch (err) {
    res.status(401).json({ err });
  }
};

module.exports = {
  checkToken,
};
