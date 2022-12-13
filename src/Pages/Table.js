import React from 'react';
import { Link } from 'react-router-dom';
import { deleteDoc, getDocs } from 'firebase/firestore';
import { collection, doc } from 'firebase/firestore';
import Navbar from "./Navbar";
import { db ,auth} from '../config';
import { onAuthStateChanged } from "firebase/auth";

const Table = () => {
  const [data, setData] = React.useState('');
  const [user, setUser] = React.useState("no user");
  const { displayName, uid, email } = user;
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => (user ? setUser(user) : setUser("")));
  }, [])
  React.useEffect(() => {
    (async () => {
      let res = [];
      const querySnapshot = await getDocs(collection(db, 'users',uid,"film"));
      querySnapshot.forEach((doc) => {
        res.push({ [doc.id]: doc.data() });
      });
      setData(res);
    })();
  });

  const deleteData = async (id) => {
    await deleteDoc(doc(db, 'users', uid,"film",id));
  };

  return (
    <div>
      <Navbar/>
      <div className="w-[1200px] mx-auto">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4"></th>
                <th scope="col" className="py-3 px-6">
                  Judul
                </th>
                <th scope="col" className="py-3 px-6">
                  Rating
                </th>
                <th scope="col" className="py-3 px-6">
                  Status
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, index) => {
                  return Object.keys(item).map((id, index) => {
                    return (
                      <>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="p-4 w-4">
                            <div className="flex items-center">
                              <input
                                id="checkbox-table-search-1"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label for="checkbox-table-search-1" className="sr-only">
                                checkbox
                              </label>
                            </div>
                          </td>
                          <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item[id].title||item[id].movieDetails.Title}
                          </th>
                          <td className="py-4 px-6">{item[id].rating||0}</td>
                          <td className="py-4 px-6">{item[id].status||"ingin ditonton"}</td>
                          <td className="flex items-center py-4 px-6 space-x-3">
                            <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                              <Link to={`/edit/${id}`}>Edit</Link>
                            </button>
                            <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => deleteData(id)}>
                              Remove
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  });
                })}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          className="my-5 mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <Link to="/Form">Form</Link>
        </button>
      </div>
    </div>
  );
};

export default Table;
