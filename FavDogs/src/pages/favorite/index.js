import React from "react";
import "./favorite.css";
import { useEffect, useState } from "react";
import GalleryItem from "../../components/gallery-item";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Favorite(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const favListStr = localStorage.getItem("FAV_LIST");
    let favList = [];
    if (favListStr) {
      favList = JSON.parse(favListStr);
    }

    setData(favList);


  }, []);

  return (
    <div className="favorite-list">
      <Link
        to={'/'}
      >
        <button className="dog-list-btn" >Dogs List</button>
      </Link>

      <div className="grid-container">
        {
          data.map((item, key) => (
            <GalleryItem
              isFavItem={true}
              key={key}
              item={item}
              onFavSelect={() => {
                const favListStr = localStorage.getItem("FAV_LIST");
                let favList = [];
                if (favListStr) {
                  favList = JSON.parse(favListStr);
                }

                let favIndex = -1;

                favList.forEach((element, index) => {
                  if (element.url === item.url) {
                    favIndex = index;
                  }
                });

                if (favIndex !== -1) {
                  favList.splice(favIndex, 1);
                  toast("Dog has been  removed from the favorites", {
                    position: toast.POSITION.TOP_LEFT,
                    type: "success"
                  });
                }

                setData(favList);

                localStorage.setItem("FAV_LIST", JSON.stringify(favList));
              }}
            />
          ))

        }
        <div className="fill-space" />
        <div className="fill-space" />
        <div className="fill-space" />
        <div className="fill-space" />
      </div>

      <ToastContainer autoClose={2000} />
    </div >
  );
}

export default Favorite;
