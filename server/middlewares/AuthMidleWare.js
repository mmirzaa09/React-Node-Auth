const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if(!accessToken) return  res.json({error: "User Not Logged In!"});

    try {
        const validToken = verify(accessToken, "importantsecrete");
        req.user = validToken
        if(validToken) {
            return next();
        }
    } catch (error) {
        return  res.json({error: error});
    }
};

module.exports = { validateToken };