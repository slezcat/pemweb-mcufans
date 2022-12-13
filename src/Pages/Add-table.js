import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addDoc } from 'firebase/firestore';
import { db } from '../firebass-config';
import { collection } from 'firebase/firestore';

const Form = () => {
  const navigate = useNavigormData, setFate();
  const [formData] = React.useState({
    nama: '',
    warna: '',
  });

  const { nama, warna, harga, type, } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const addedData = {
      nama,
      warna,
      harga,
      type,
    };

    await addDoc(collection(db, 'car'), {
      ...addedData,
    });

    navigate('/');
  };

  return (
    <>
    <div className='bg-[#FF3355] h-screen'>
    <form onSubmit={onSubmit}>
        <div classnama="mb-6 mx-10">
          <label for="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Product nama
          </label>
          <input
            name="nama"
            type="text"
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={nama}
            onChange={onChange}
          />
          <label for="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            warna
          </label>
          <input
            name="warna"
            type="text"
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={warna}
            onChange={onChange}
          />
          <label for="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Harga
          </label>
          <input
            name="harga"
            type="text"
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={harga}
            onChange={onChange}
          />
          <label for="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Type
          </label>
          <input
            name="type"
            type="text"
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={type}
            onChange={onChange}
          />
          <button
            type="submit"
            className="my-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          <button
            type="button"
            className="m-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <Link to="/">Table</Link>
          </button>
        </div>
      </form>   
    </div>
      
    </>
  );
};

export default Form;
