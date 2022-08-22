import React from "react";
import "./style.css";
import { isVideoType } from "../../services/utils";

function GalleryItem({ item, onFavSelect, isFavItem = false }) {
  return (
    <div className="gallery-item">

      <div className="media-container">
        {
          isVideoType(item.url) ? <video controls>
            <source src={item.url}
              type="video/mp4" />

            Sorry, your browser doesn't support embedded videos.
          </video> : <img src={item.url} alt='dog'></img>
        }
      </div>
      <button className="favbtn" onClick={onFavSelect}>{isFavItem ? "Remove Favorite" : "Favorite"}</button>
    </div>
  );
}

export default GalleryItem;
