// import react useState hook
import React, { useState } from "react";
// ChooseCategory component accepts props from parent component
const ChooseCategory = ({ categories, handleFilter }) => {
  // isChecked state
  const [isChecked, setIsChecked] = useState([]);

  // handle toggle higher order function will fire whenever there is an onchange event in the input when user filters different types of categries
  const handleToggle = (category) => () => {
    // if categeory is already in the state return the first index or -1
    const currentCategoryID = isChecked.indexOf(category)
    // get everything that is in the state
    const newCheckedCategoryID = [...isChecked];
    // if currently checked was not already in checked state then push
    if(currentCategoryID === - 1){
        newCheckedCategoryID.push(category)
        
    }else{
      //if category was already checked then check it out
        newCheckedCategoryID.splice(currentCategoryID, 1)
    }
    // console.log(newCheckedCategoryID)
    //update the state
    setIsChecked(newCheckedCategoryID)
    handleFilter(newCheckedCategoryID)
  };

  // iterate over categories
  return categories.map((category, index) => (
    <>
      <li
        key={index}
        className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600"
      >
        <div className="flex items-center pl-3">
          <input
            type="checkbox"
            onChange={handleToggle(category._id)}
            value={isChecked.indexOf(category._id === -1)}
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">
            {category.name}
          </label>
        </div>
      </li>
    </>
  ));
};

export default ChooseCategory;
