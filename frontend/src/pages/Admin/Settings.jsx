// ✅ Redesigned, stylish & professional Settings page with Tailwind UI

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";

import {
  updateProfile,
  changePassword,
  updateUserProfileImage,
} from "../../services/operations/SettingsAPI";

import IconBtn from "../../components/common/IconBtn";
import Img from "../../components/common/Img";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

export default function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = async (data) => {
    dispatch(updateProfile(token, data));
  };

  const submitPasswordForm = async (data) => {
    dispatch(changePassword(token, data));
  };

  const handleClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPreviewSource(reader.result);
  };

  const handleFileUpload = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("profileImage", profileImage);
    dispatch(updateUserProfileImage(token, formData)).then(() => setLoading(false));
  };

  useEffect(() => {
    if (profileImage) previewFile(profileImage);
  }, [profileImage]);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-10">Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* === Profile Image === */}
          <div className="lg:col-span-1 bg-gradient-to-tr from-white to-blue-50 p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Profile Picture</h2>
            <div className="flex items-center justify-center">
                <Img
                    src={previewSource || user?.image}
                    alt={`profile-${user?.firstName}`}
                    className="w-[180px] h-[180px] rounded-full object-cover"
                  />
                  </div>
            <div className="pt-10 flex items-center justify-center gap-10">
             
              <div className="space-y-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleClick}
                    disabled={loading}
                    className="bg-gray-200 border border-gray-600 px-4 py-1.5 rounded hover:bg-gray-300 text-sm"
                  >
                    Select
                  </button>
                  <IconBtn
                    text={loading ? "Uploading..." : "Upload"}
                    onclick={handleFileUpload}
                  >
                    {!loading && <FiUpload />}
                  </IconBtn>
                </div>
              </div>
            </div>
          </div>

          {/* === Profile Info === */}
          <div className="lg:col-span-2 bg-gradient-to-tr from-white to-blue-50 p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">Update Profile</h2>
            <form className="grid gap-6" onSubmit={handleSubmit(submitProfileForm)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="hidden" value={user?._id} {...register("id")} />
                <div className="space-y-2 flex gap-2 items-center">
                  <label className="text-sm font-medium text-gray-600">First Name</label>
                  <input
                    className="form-style-1"
                    defaultValue={user?.firstName}
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName && <p className="text-xs text-red-500">Required</p>}
                </div>
                <div className="space-y-2 flex gap-2 items-center">
                  <label className="text-sm font-medium text-gray-600">Last Name</label>
                  <input
                    className="form-style-1"
                    defaultValue={user?.lastName}
                    {...register("lastName", { required: true })}
                  />
                  {errors.lastName && <p className="text-xs text-red-500">Required</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 flex gap-2 items-center">
                  <label className="text-sm font-medium text-gray-600">Gender</label>
                  <select className="form-style-1" defaultValue={user?.additionalDetails?.gender} {...register("gender")}> 
                    {genders.map((g, i) => <option key={i} value={g}>{g}</option>)}
                  </select>
                </div>
                <div className="space-y-2 flex gap-2 items-center">
                  <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                  <input type="date" className="form-style-1" defaultValue={user?.additionalDetails?.dateOfBirth} {...register("dateOfBirth")}/>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 flex gap-2 items-center">
                  <label className="text-sm font-medium text-gray-600">Contact Number</label>
                  <input className="form-style-1" defaultValue={user?.additionalDetails?.contactNumber} {...register("contactNumber")}/>
                </div>
                <div className="space-y-2 flex gap-2 items-center">
                  <label className="text-sm font-medium text-gray-600">About</label>
                  <input className="form-style-1" defaultValue={user?.additionalDetails?.about} {...register("about")}/>
                </div>
              </div>

              <div className="flex justify-end">
                <IconBtn type="submit" text="Save Changes" />
              </div>
            </form>
          </div>
        </div>

        {/* === Password Section === */}
        <div className="mt-10 bg-gradient-to-tr from-white to-blue-50 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-6 text-gray-700">Change Password</h2>
          <form className="grid gap-6 md:grid-cols-3" onSubmit={handleSubmit(submitPasswordForm)}>
            <div className="relative space-y-2 flex gap-2 items-center">
              <label className="text-sm font-medium text-gray-600">Current Password</label>
              <input type={showOldPassword ? "text" : "password"} className="form-style-1" {...register("oldPassword")}/>
              <span onClick={() => setShowOldPassword(!showOldPassword)} className="absolute right-5 top-4 cursor-pointer">
                {showOldPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            <div className="relative space-y-2 flex gap-2 items-center">
              <label className="text-sm font-medium text-gray-600">New Password</label>
              <input type={showNewPassword ? "text" : "password"} className="form-style-1" {...register("newPassword")}/>
              <span onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-10 top-4 cursor-pointer">
                {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            <div className="relative space-y-2 flex gap-2 items-center">
              <label className="text-sm font-medium text-gray-600">Confirm Password</label>
              <input type={showConfirmNewPassword ? "text" : "password"} className="form-style-1" {...register("confirmNewPassword")}/>
              <span onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} className="absolute right-4 top-4 cursor-pointer">
                {showConfirmNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            <div className="col-span-full flex justify-end">
              <IconBtn type="submit" text="Update Password" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}