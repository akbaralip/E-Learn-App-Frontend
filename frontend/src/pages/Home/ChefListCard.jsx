import React from "react";
import {
  Card as MaterialUICard,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { baseUrl } from "../../Redux/Store/baseUrl/BaseUrl";
import "./Card.css";

function ChefListCard({ chefs }) {
  if (!chefs || chefs.length === 0) {
    return null;
  }

  
  const displayedChefs = chefs.slice(0, 4);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {displayedChefs.map((chef) => (
        <div key={chef.id}>
          <MaterialUICard>
            <CardActionArea>
              <CardMedia
                className="custom-media"
                component="img"
                image={`${baseUrl}${chef.image_url}`}
                alt="Chef Image"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  className="custom-heading flex justify-center items-center"
                >
                  {chef.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </MaterialUICard>
        </div>
      ))}
    </div>
  );
}

export default ChefListCard;
