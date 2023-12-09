import "./Navbar.scss"
import { useAuth } from "../../context/AuthProvider";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="logo" />
        <span>Senior Design Project</span>
      </div>
      <div className="icons">
        <div className="notification">
          <img src="/notifications.svg" alt="" className="icon" />
          <span>1</span>
        </div>
        <div className="user">
          <span> {user.firstName} {user.lastName} </span>
          <img src="/user.svg" alt="" className="icon" />
        </div>
      </div>
    </div>
  )
}

export default Navbar