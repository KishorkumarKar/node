const express = require("express");
const multer = require("multer");
const { uploadFile } = require("../controllers/media.controller");
const logger = require("../utils/logger.utility");
const router = express.Router();
const maxSize = 1024 * 1024; // 1 MB;

//------------------
// const data=checkMe=>(a,b)=>{}
// const data=function checkMe(){
//     function aaa(a,b){

//     }
// }
//------------------

// -----------if want to upload file in folder
/* const upload = multer({ dest: "./public/temp/uploads/",limits: { fileSize: maxSize}
 }).single("file"); */
// -----------if want to upload file in folder
const upload = multer({ limits: { fileSize: maxSize, files: 1 } }).single(
  "uploaded_image",
); // if want to upload file in folder

router.post(
  "/upload",
  (req, res, next) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        logger.error(err);
        res.status(401);
        return res.json({
          success: false,
          message: err.message,
        });
      } else if (err) {
        logger.error(err);
        res.status(401);
        return res.json({
          success: false,
          message: "There is some problem try again after sometime",
        });
      }
      return next();
    });
  },
  uploadFile,
);

module.exports = router;
