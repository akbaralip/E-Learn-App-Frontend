
import {
  Card as MaterialUICard,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from "@mui/material";
import React from "react";
import { baseUrl } from "../../Redux/Store/baseUrl/BaseUrl";

function ChefCard({ course }) {
  if (!course) {
    return null;
  }

  const coverImage = course.cover_image ? `${baseUrl}${course.cover_image}` : '';

  const cardContainerStyle = {
    width: '300px',
    height: '400px',
    
    
  };

  const cardStyle = {
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
  };

  const mediaStyle = {
    objectFit: 'cover',
    height: '140px',
  };

  return (
    <div className="w-full p-4 py-2 " style={cardContainerStyle}>
      <MaterialUICard style={cardStyle}>
        <CardActionArea>
          <CardMedia
            className="custom-media"
            component="img"
            height="140"
            image={coverImage}
            alt="image"
            style={mediaStyle}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              className="custom-heading flex justify-center items-center"
            >
            </Typography>
            <Typography variant="body2" className="custom-text">
              {course.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </MaterialUICard>
    </div>
  );
}

export default ChefCard;

