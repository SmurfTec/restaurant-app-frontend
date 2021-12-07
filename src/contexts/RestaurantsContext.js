import { useArray } from 'hooks';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { makeReq, handleCatch } from 'utils/makeReq';

export const RestaurantsContext = React.createContext();

export const RestaurantsProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [
    restaurants,
    setRestaurants,
    pushRestaurant,
    filterRestaurant,
    updateRestaurant,
    removeRestaurant,
    clearRestaurants,
  ] = useArray([], '_id');

  const fetchRestaurants = async () => {
    try {
      const resData = await makeReq(`/restaurants`);
      setRestaurants(resData.restaurants);
    } catch (err) {
      handleCatch(err);
    } finally {
      setLoading(false);
    }
  };

  const getRestaurantById = (id) => {
    return restaurants.find((el) => el._id === id);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <RestaurantsContext.Provider
      displayName='Restaurants Context'
      value={{
        loading,
        restaurants,
        getRestaurantById,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};
