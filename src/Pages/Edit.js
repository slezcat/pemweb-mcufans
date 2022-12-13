import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { updateDoc } from 'firebase/firestore';
import { db } from '../config';
import { doc } from 'firebase/firestore';
import Navbar from "./Navbar";
import {auth} from '../config';
import { onAuthStateChanged } from "firebase/auth";
const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = React.useState({
    title: '',
    rating: '',
  });
  const [user, setUser] = React.useState("no user");
  const { displayName, uid, email } = user;
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => (user ? setUser(user) : setUser("")));
  }, [])
  const { title, rating } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      title,
      rating,
    }; 

    await updateDoc(doc(db, 'users', uid,"film",id), {
      ...updatedData,
    });

    navigate('/list');
  };

  return (
    <>
    <Navbar/>
      <form onSubmit={onSubmit}>
        <div className="mb-6 mx-10">
          <label for="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Title
          </label>
          <input
            name="title"
            type="text"
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={title}
            onChange={onChange}
          />
          <label for="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Rating
          </label>
          <input
            name="rating"
            type="text"
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={rating}
            onChange={onChange}
          />
          <button
            type="submit"
            className="my-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          <button type='button' className='m-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            <Link to="/">Table</Link>
          </button>
        </div>
      </form>
    </>
  );
};

export default Edit;
