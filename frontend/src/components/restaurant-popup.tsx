import { Edit, Delete, MoreVert } from "@mui/icons-material";
import { useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { Api } from "../services/api";
import { Restaurant } from "../models/Restaurant";

const api = new Api();

type EditRestaurantMenuItemProps = {
  restaurant: Restaurant;
  restaurantEdited: (restaurant: Restaurant) => void;
};

const EditRestaurantMenuItem = ({
  restaurant,
  restaurantEdited,
}: EditRestaurantMenuItemProps) => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const saveChanges = async () => {
    const restaurantRequest = {
      name: name,
      description: description,
    };
    await api.updateRestaurant(restaurant.id, restaurantRequest);

    setOpen(false);

    restaurantEdited({
      id: restaurant.id,
      ...restaurantRequest,
    });
  };

  const openEditRestaurantModal = () => {
    setName(restaurant.name);
    setDescription(restaurant.description);
    setOpen(true);
  };

  return (
    <>
      <MenuItem onClick={openEditRestaurantModal}>
        <ListItemIcon>
          <Edit fontSize="small" />
        </ListItemIcon>
        <ListItemText>Edit</ListItemText>
      </MenuItem>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>Editing restaurant</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              paddingTop: "10px",
              width: "400px",
            }}
          >
            <TextField
              label="Name"
              value={name}
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Description"
              value={description}
              multiline
              minRows={3}
              fullWidth
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={saveChanges}
            style={{ width: "60px" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

type DeleteRestaurantMenuItemProps = {
  restaurant: Restaurant;
  restaurantRemoved: (restaurant: Restaurant) => void;
};

const DeleteRestaurantMenuItem = ({
  restaurant,
  restaurantRemoved,
}: DeleteRestaurantMenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => setIsOpen(false);
  const removeRestaurant = async () => {
    await api.deleteRestaurant(restaurant.id);
    closeDialog();
    restaurantRemoved(restaurant);
  };

  return (
    <>
      <MenuItem
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <ListItemIcon>
          <Delete fontSize="small" />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
      <Dialog open={isOpen} keepMounted onClose={closeDialog}>
        <DialogTitle>{`Are you sure to delete restaurant ${restaurant.name}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Restaurant ${restaurant.name} will be permanently removed from the system. The operation cannot be undone.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={removeRestaurant}>Remove</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export type RestaurantPopupProps = {
  restaurant: Restaurant;
  restaurantEdited: (restaurant: Restaurant) => void;
  restaurantRemoved: (restaurant: Restaurant) => void;
};

export const RestaurantPopup = ({
  restaurant,
  restaurantEdited,
  restaurantRemoved,
}: RestaurantPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={isOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        ref={menuButton}
        style={{ color: "white" }}
      >
        <MoreVert style={{ color: "black" }} />
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
        <EditRestaurantMenuItem
          restaurant={restaurant}
          restaurantEdited={restaurantEdited}
        />
        <DeleteRestaurantMenuItem
          restaurant={restaurant}
          restaurantRemoved={restaurantRemoved}
        />
      </Menu>
    </>
  );
};
