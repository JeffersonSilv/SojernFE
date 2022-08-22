import React, { useCallback } from "react";
import "./home.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GalleryItem from "../../components/gallery-item";
import { Link } from "react-router-dom";


let cacheDogsList;

function Home(props) {
  const [data, setData] = useState([]);
  var isFirstTime = true;

  const getDogs = useCallback(() => {
    setData([]);
    let dogList = [];

    const getDogImg = () => {
      fetch("https://random.dog/woof.json").then((result) => {
        result.json().then((resp) => {
          dogList.push(resp);
          if (dogList.length === 6) {
            cacheDogsList = dogList;
            setData(dogList);
          } else {
            getDogImg();
          }
        });
      });
    };

    getDogImg();
  }, []);

  useEffect(() => {
    if (isFirstTime) {
      isFirstTime = false;
      if (cacheDogsList) {
        setData(cacheDogsList);
      } else {
        getDogs();
      }
    }
  }, [isFirstTime]);

  return (
    <div className="home-page">
      <button className="refresh-btn" onClick={getDogs}>Refresh</button>

      <Link
        to={'/favorite'}
      >
        <button className="fav-dog-btn" onClick={() => {}}>Favorite Dogs</button>

      </Link>


      <div className="grid-container">


        {data.length === 0 ? <div className="loading-txt">Loading.....</div> : <>
          {data.map((item, key) => (
            <GalleryItem
              item={item}
              key={key}
              onFavSelect={() => {
                const favListStr = localStorage.getItem("FAV_LIST");
                let favList = [];
                if (favListStr) {
                  favList = JSON.parse(favListStr);
                }

                let isFavAlreadyAdded = false;

                favList.forEach(element => {
                  if (element.url === item.url) {
                    isFavAlreadyAdded = true;
                  }
                });

                if (!isFavAlreadyAdded) {
                  favList.push(item);
                  toast("Dog has been added to the favorites", {
                    position: toast.POSITION.TOP_LEFT,
                    type: "success"
                  })
                } else {
                  toast("This dog is already added to favorite", {
                    position: toast.POSITION.TOP_LEFT,
                    type: "error"
                  });
                }

                localStorage.setItem("FAV_LIST", JSON.stringify(favList));
              }}
            />
          ))}
        </>}
      </div>

      <ToastContainer autoClose={2000} />

    </div>
  );
}

export default Home;
