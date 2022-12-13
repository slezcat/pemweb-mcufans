import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addDoc } from "firebase/firestore";
import { db } from "../config";
import { collection } from "firebase/firestore";
import image from "./Marvel_Cinematic_Universe_Logo (1).jpg";
import Navbar from "./Navbar";
import { auth } from "../config";
import { onAuthStateChanged } from "firebase/auth";
import Modal from "./Modal";
function Home() {
  const [modal, setModal] = React.useState(false);
  const [modalData, setModalData] = useState("");
  const [data, setData] = React.useState("");
  const [user, setUser] = React.useState("no user");
  const { displayName, uid, email } = user;
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => (user ? setUser(user) : setUser("")));
  }, []);
  const apikey = "http://www.omdbapi.com/?apikey=5afd2403&s=avengers";
  const getData = (movieId) => {
    const apikey = "http://www.omdbapi.com/?apikey=5afd2403&";
    // ngambil kata2 string dari input

    // menggabungkan api key dengan paramater
    const detailsData = "i=" + movieId;

    // apakah parameter untuk detail film atau cari film saja
    const param = movieId ? detailsData : "s=avengers";
    // ngambil data dari api
    return fetch(apikey + param)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        //parsing json
        return res.json();
      })
      .then((res) => {
        if (res.Response === "False") throw new Error(res.Error);
        //return data
        return res;
      });
  };
  const openModal = async (movieId) => {
    // ambil movie detail sesuai id filmnya lalu tampilkan
    const movieDetails = await getData(movieId);
    setModalData(movieDetails);
    setModal(true);
   
  };
  
  const addToList = async(movieDetails)=>{
 if (user) {
        if (window.confirm('Are you sure you want to save this thing into the database?')) {
            await addDoc(collection(db, "users",uid,"film"), {
                movieDetails,
              });
          } else {
            // Do nothing!
            console.log('Thing was not saved to the database.');
          }
    }
  }
  React.useEffect(() => {
    const getHomeData = async () => {
      return fetch(apikey)
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText);
          //parsing json
          return res.json();
        })
        .then((res) => {
          if (res.Response === "False") throw new Error(res.Error);
          //return data
          console.log(res);
          setData(res);
          return res;
        });
    };
    getHomeData();

    // setData(await getData())
    // console.log(getData())
  }, []);
  const closeModal = () => {
    setModal(false);
  };
  return (
    <>
      <div
        className={`modal ${
          modal ? "block" : "hidden"
        }  fixed z-50 pt-[100px] left-0 top-0 w-full h-full overflow-auto bg-black/50 `}
      >
        <div class="modal-content bg-[#fefefe] m-auto p-[20px] border-2 border-[#888] w-[80%] ">
          <span
            class="close text-[#aaaaaa] float-right text-[28px] font-bold hover:cursor-pointer hover:text-[#000]"
            onClick={closeModal}
          >
            &times;
          </span>
          <div class="flex gap-3 flex-col">
            <div class="flex justify-between pr-5">
              <h1 class="text-2xl font-bold">
                {modalData.Title}{" "}
                <span class="font-normal text-lg">{modalData.Year}</span>
              </h1>
              <p class="text-2xl font-bold">{modalData.imdbRating}</p>
            </div>
            <hr />
            <p>{modalData.Plot}</p>
            <hr />
            <div>
              <h1 class="font-semibold text-left">
                Genre : <span class="font-normal">{modalData.Genre}</span>
              </h1>
              <h1 class="font-semibold text-left">
                Writer : <span class="font-normal">{modalData.Writer}</span>
              </h1>
              <h1 class="font-semibold text-left">
                Director : <span class="font-normal">{modalData.Director}</span>
              </h1>
              <h1 class="font-semibold text-left">
                Actors : <span class="font-normal">{modalData.Actors}</span>
              </h1>
              <hr />
              <button className="bg-[#1976d2] px-2 py-2 mt-4 text-white rounded font-semibold" onClick={()=>addToList(modalData)}>
                Add to List
              </button>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
      <img src={image} className="-z-10 w-[800px] mx-auto" />
      <div
        className="grid grid-cols-4 relative"
        style={{ backgroundImage: image }}
      >
        {data &&
          data.Search.map((i) => {
            return (
              <>
                <div
                  class="movie-container cursor-pointer text-center flex flex-col items-center"
                  id={i.imdbID}
                  onClick={() => openModal(i.imdbID)}
                >
                  <img
                    src={i.Poster}
                    class="h-full justify-self-center mx-auto"
                  />
                  <h1 class="text-xl font-medium h-[10vh]">{i.Title}</h1>
                  <div id="myModal" class="modal"></div>
                </div>
              </>
            );
          })}
        {/* {data &&
          data.Search.map((i) => {
            return (
              <>
                 <Modal m={i} isOpen={modal}/>
                
              </>
            );
          })} */}
      </div>
    </>
  );
}

export default Home;
