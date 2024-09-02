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
import { RestaurantPopup } from "../components/restaurant-popup";

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

  const handleAddingRestaurantAdded = (restaurant: Restaurant) => {
    setRestaurants((prev) => [...prev, restaurant]);
  };

  const handleEditingRestaurant = (restaurant: Restaurant) => {
    setRestaurants((prev) =>
      prev.map((r) => (r.id === restaurant.id ? restaurant : r))
    );
  };

  const handleRestaurantRemoved = (restaurant: Restaurant) => {
    setRestaurants((prev) => prev.filter((r) => r.id !== restaurant.id));
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  return (
    <>
      <AddingNewRestaurantDialog
        restaurantAdded={handleAddingRestaurantAdded}
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                {r.name}
                <RestaurantPopup
                  restaurant={r}
                  restaurantEdited={handleEditingRestaurant}
                  restaurantRemoved={handleRestaurantRemoved}
                />
              </div>
            </AccordionSummary>
            <AccordionDetails>{r.description}</AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
};
