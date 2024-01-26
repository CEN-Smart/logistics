import React, { useContext, useState } from "react";
import TableProfile from "./TableProfile";
import "./Profile.css";
import ProfileAd from "./ProfileAd";
import { AddContext } from "../../../Context/AddContext";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CloseIcon from "@mui/icons-material/Close";

const ProfileContent = () => {
  const { isPopupVisible, mobile, handleClick } = useContext(AddContext);
  const [search, setSearch] = useState("");
  function handleChange(event) {
    setSearch(event.target.value);
  }
  return (
    <div className="employee__div">
      <div className="employee__divs">
        <div className="board__header">
          <div className="men" onClick={handleClick}>
            {mobile ? (
              <CloseIcon style={{ color: "white" }} />
            ) : (
              <MenuOpenIcon style={{ color: "white" }} />
            )}
          </div>
          <div className="greetings">New Ads </div>
          <div className="search">
            <div className="label">
              <input type="text" onChange={handleChange} placeholder="search" />
              <img src="./img/Search.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="employees__detail">
        <TableProfile />
      </div>
      {isPopupVisible && (
        <div className="profile__Adsss">
          <ProfileAd />
        </div>
      )}
    </div>
  );
};

export default ProfileContent;