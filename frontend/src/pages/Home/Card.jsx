import {
  Card as MaterialUICard,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { baseUrl } from "../../Redux/Store/baseUrl/BaseUrl";
import './Card.css';
import ItemList from "../CategoryListing/ItemList";
import { Link } from "react-router-dom";

function Card({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (!categories || categories.length === 0) {
    return null;
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <div key={category.id} onClick={() => handleCategoryClick(category)}>
          <Link to={`/selectedCategory/${category.id}`}>
            <MaterialUICard>
              <CardActionArea>
                <CardMedia
                  className="custom-media"
                  component="img"
                  image={`${baseUrl}${category.category_image}`}
                  alt="Category Image"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="body1"
                    component="div"
                    className="custom-heading flex justify-center items-center"
                  >
                    {category.category}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </MaterialUICard>
          </Link>
        </div>
      ))}
      {selectedCategory && (
        <Link to={`/selectedCategory/${selectedCategory.id}`}>
          <ItemList selectedCategory={selectedCategory} />
        </Link>
      )}
    </div>
  );
}

export default Card;
