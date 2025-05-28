const expressAsyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const users = require("../models/userModel");
const { constants } = require("../constants");

//@desc Get all Address
//@route GET /api/users/address
//@access private
const getAllAddress = expressAsyncHandler(async (req, res) => {
  const usersData = await users.findOne({ _id: req.user.id });
  res.json(usersData);
});

//@desc Get specific
//@route GET /api/users/address/:id
//@access private
const getAddress = expressAsyncHandler(async () => {});

//@desc Add new Address
//@route POST /api/users/address/
//@access private
const addAddress = expressAsyncHandler(async (req, res) => {
  // to update single Data
  //  let usersData= await users.findOneAndUpdate({ _id: req.user.id }, {$set: {address: req.body}},{ new: true })

  // to add new data on array
  let usersData = await users.findOneAndUpdate(
    { _id: req.user.id },
    { $push: { address: req.body } },
    { new: true }
  );

  console.log("add Address:- ", req.body, usersData);

  res.json(usersData);
});

//@desc Update Address
//@route PUT /api/users/address/
//@access private
const updateAddress = expressAsyncHandler(async (req, res) => {
  let updateData = req.body;
  updateData._id = req.params.id;
  await users
    .findOneAndUpdate(
      { "address._id": req.params.id },
      { $set: { "address.$": updateData } },
      { new: true }
    )
    .then((success) => {
      res.json(success);
    })
    .catch((error) => {
      res.status(constants.MONGOOSE_ERROR);
      throw new Error(error.message);
    });
});

//@desc Delete Address
//@route DELETE /api/users/address/:Id
//@access private
const deleteAddress = expressAsyncHandler(async (req, res) => {
  let usersData = await users.findOneAndUpdate(
    { _id: req.user.id },
    {
      $pull: {
        address: { _id: req.params.id },
      },
    },
    { new: true }
  );

  console.log("Remove Address:- ", req.params.id, usersData);

  res.json(usersData);
});

module.exports = {
  getAllAddress,
  addAddress,
  getAddress,
  updateAddress,
  deleteAddress,
};
