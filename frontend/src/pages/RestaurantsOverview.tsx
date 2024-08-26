import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { Restaurant } from "../models/Restaurant";
import { Api } from "../services/api";

const api = new Api();

export const RestaurantsOverview = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    api.getAllRestaurants().then((r) => setRestaurants(r));
  }, []);

  return (
    <div>
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
  );
};
