const bcrypt = require("bcrypt");
const { constants } = require("../constants");
const asyncHandler = require("express-async-handler");

const createToken = asyncHandler(
  (password) =>
    new Promise((resolve, reject) => {
      bcrypt.hash(password, constants.SALT_ROUND, (err, hash) => {
        if (!err) {
          resolve(hash);
        } else {
          reject(err);
        }
      });
    })
);

const compareToken = (password, hash) =>
  new Promise((resolve, reject) => {
    return bcrypt.compare(password, hash, function (err, result) {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });

module.exports = {
  createToken,
  compareToken,
};
