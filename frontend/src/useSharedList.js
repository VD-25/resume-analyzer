// useSharedList.js
import { useState } from 'react';

// This custom hook abstracts the useState logic for a list
const useSharedList = () => {
    const [users, setUsers] = useState([]);  // Initialize an empty list

  // Function to add an item to the list
  const addItem = (item) => {
    setUsers((prevList) => [...prevList, item]);
  };

  // Function to remove an item from the list
  const removeItem = (item) => {
    setUsers((prevList) => prevList.filter((i) => i !== item));
  };

  // Return the list and functions to modify it
  return {
    users,
    addItem,
    removeItem
  };
};

export default useSharedList;