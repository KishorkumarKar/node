const express = require("express");
const {
  registerUser,
  currentUser,
  loginUser,
} = require("../controllers/userController");
const {
  getAddress,
  addAddress,
  updateAddress,
  getAllAddress,
  deleteAddress
} = require("../controllers/addressController");
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

router.get("/address/", validateToken, getAllAddress);
router.post("/address/", validateToken, addAddress);
router.put("/address/:id", validateToken, updateAddress);
router.get("/address/:id", validateToken, getAddress);
router.delete("/address/:id", validateToken, deleteAddress);

module.exports = router;
