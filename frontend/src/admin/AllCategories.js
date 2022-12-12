import React, { useEffect, useState } from "react";
import { getAllCategories, deleteCategory } from "./apiAdmin";
import { isAuthenticated } from "../auth/authenticate";
import { AiFillDelete } from "react-icons/ai"

/*
AllCategories component that uses getAllCategories and deleteCategory functions 
from api admin fetch and delete all the categories created 
*/

const AllCategories = () => {
  //state
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  // destructure values from isAuthenticated
  const { user, token } = isAuthenticated();

  // get all categories
  const fetchCategories = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  // remove category function
  const removeCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(data.error);
      } else {
        fetchCategories();
      }
    });
  };

  // get all categories whenever the component re-renders
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      
      <p className="mt-4 mb-4 text-2xl text-center">
        {categories.length} Categories
      </p>
      {categories.map((category, index) => (
        <div className="flex mb-2 justify-center" key={index}>
          <p className="w-2/4 text-grey-darkest">
            {category.name}
          </p>
          <button
            className="flex-no-shrink p-2 ml-2"
            onClick={() => removeCategory(category._id)}
          >
            <AiFillDelete style={{ color: "red", height: "20px", width: "20px" }}/>
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllCategories;
