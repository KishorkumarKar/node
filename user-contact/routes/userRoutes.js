const express = require("express");
const {
  registerUser,
  currentUser,
  loginUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

/*

*This:-
*
router.post("/register", (req,res)=>{
  console.log("request Data:- ",req.body)
  res.status(200);
  res.json({test:"test"})
});

* to :-

router.post("/register", registerUser);

*/

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

module.exports = router;
