import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

export const SettingsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  const usersMenuItemClicked = () => {
    navigate("/users");
    setIsOpen(false);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={isOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        onClick={() => setIsOpen((prev) => !prev)}
        ref={menuButton}
        style={{ color: "white" }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={menuButton.current}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={usersMenuItemClicked}>Users</MenuItem>
      </Menu>
    </>
  );
};
