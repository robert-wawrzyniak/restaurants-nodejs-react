import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { Restaurant } from "../models/Restaurant";
import { Api } from "../services/api";

const api = new Api();

type AddingNewRestaurantDialogProps = {
  restaurantAdded: (newRestaurant: Restaurant) => void;
};

const AddingNewRestaurantDialog = ({
  restaurantAdded,
}: AddingNewRestaurantDialogProps) => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const saveNewRestaurant = async () => {
    const restaurant = await api.createRestaurants({
      name: name,
      description: description,
    });

    setOpen(false);

    restaurantAdded(restaurant);
  };

  const openAddRestaurantModal = () => {
    setName("");
    setDescription("");
    setOpen(true);
  };

  return (
    <>
      <Button variant="contained" onClick={openAddRestaurantModal}>
        Add restaurant
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>Adding new restaurant</DialogTitle>
        <DialogContent>
          <TextField
            value={name}
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            value={description}
            multiline
            fullWidth
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={saveNewRestaurant}
            style={{ width: "60px" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const RestaurantsOverview = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const loadRestaurants = async () => {
    const restaurants = await api.getAllRestaurants();
    setRestaurants(restaurants);
  };

  const handleAddingRestaurantDialogClosed = (restaurant: Restaurant) => {
    setRestaurants((prev) => [...prev, restaurant]);
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  return (
    <>
      <AddingNewRestaurantDialog
        restaurantAdded={handleAddingRestaurantDialogClosed}
      />
      <div
        style={{
          marginTop: 20,
        }}
      >
        {restaurants.map((r, i) => (
          <Accordion key={i}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${i}-content`}
              id={`panel${i}-header`}
            >
              {r.name}
            </AccordionSummary>
            <AccordionDetails>{r.description}</AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
};
