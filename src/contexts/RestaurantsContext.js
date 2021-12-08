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

  // * CRUD Operations
  const createRestaurant = async (state, callback) => {
    try {
      const resData = await makeReq(`/restaurants`, { body: state }, 'POST');
      toast.success('Restaurant Created Successfully!');
      pushRestaurant(resData.restaurant);
      callback?.();
    } catch (err) {
      handleCatch(err);
    }
  };

  const editRestaurant = async (id, state, callback) => {
    try {
      const resData = await makeReq(
        `/restaurants/${id}`,
        { body: state },
        'PATCH'
      );
      toast.success('Restaurant Updated Successfully!');
      updateRestaurant(id, resData.restaurant);
      callback?.();
    } catch (err) {
      handleCatch(err);
    }
  };

  const deleteRestaurant = async (id) => {
    try {
      await makeReq(`/restaurants/${id}`, {}, 'DELETE');
      toast.success('Restaurant Deleted Successfully!');
      removeRestaurant(id);
    } catch (err) {
      handleCatch(err);
    }
  };

  return (
    <RestaurantsContext.Provider
      displayName='Restaurants Context'
      value={{
        loading,
        restaurants,
        getRestaurantById,
        createRestaurant,
        deleteRestaurant,
        editRestaurant,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};
