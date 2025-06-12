import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import ConfirmationModal from "../../common/ConfirmationModal"
import { useDispatch } from "react-redux"
import { VscSignOut } from "react-icons/vsc"
import { logout } from "../../../services/operations/authAPI"

// components/Admin/Topbar.jsx
const Topbar = () => {
   const dispatch = useDispatch()
    const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null)
  
    return (
      <div className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
        <div className="text-lg font-semibold">Welcome, Admin 👋</div>
        <div className="space-x-4">
         <NavLink to="/admin/settings"> <button className="text-sm font-medium">Settings</button></NavLink>
          <button
                        onClick={() =>
                          setConfirmationModal({
                            text1: "Are you sure ?",
                            text2: "You will be logged out of your account.",
                            btn1Text: "Logout",
                            btn2Text: "Cancel",
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () => setConfirmationModal(null),
                          })
                        }
                        className=" "
                      >
                      Logout
                    
                      </button>
        </div>
         {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      </div>
    )
  }
  
  export default Topbar
  