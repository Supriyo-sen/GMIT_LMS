const express = require("express");
const router = express.Router();

const { auth, isInstructor, isAdmin } = require("../middleware/auth");

// controllers
const {
  updateProfile,
  updateUserProfileImage,
  getUserDetails,
  getEnrolledCourses,
  deleteAccount,
  instructorDashboard,
  getAllUserProfiles,
} = require("../controllers/profile");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

// Delete User Account
router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getUserDetails);

// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);

// update profile image
router.put("/updateUserProfileImage", auth, updateUserProfileImage);

// instructor Dashboard Details
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

// Get User Profile Details
router.get("/allUserProfileDetails", auth, isAdmin, getAllUserProfiles);

module.exports = router;
