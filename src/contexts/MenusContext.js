import { useArray } from 'hooks';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { makeReq, handleCatch } from 'utils/makeReq';

export const MenusContext = React.createContext();

export const MenusProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [
    menus,
    setMenus,
    pushMenu,
    filterMenu,
    updateMenu,
    removeMenu,
    clearMenus,
  ] = useArray([], '_id');

  const fetchMenus = async () => {
    try {
      const resData = await makeReq(`/menus`);
      setMenus(resData.menus);
    } catch (err) {
      handleCatch(err);
    } finally {
      setLoading(false);
    }
  };

  const getMenuById = (id) => {
    return menus.find((el) => el._id === id);
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  // * CRUD Operations
  const createMenu = async (state, callback) => {
    try {
      const resData = await makeReq(`/menus`, { body: state }, 'POST');
      toast.success('Menu Created Successfully!');
      pushMenu(resData.menu);
      callback?.();
    } catch (err) {
      handleCatch(err);
    }
  };

  const editMenu = async (id, state, callback) => {
    try {
      const resData = await makeReq(`/menus/${id}`, { body: state }, 'PATCH');
      toast.success('Menu Updated Successfully!');
      updateMenu(id, resData.menu);
      callback?.();
    } catch (err) {
      handleCatch(err);
    }
  };

  const deleteMenu = async (id) => {
    try {
      await makeReq(`/menus/${id}`, {}, 'DELETE');
      toast.success('Menu Deleted Successfully!');
      removeMenu(id);
    } catch (err) {
      handleCatch(err);
    }
  };

  return (
    <MenusContext.Provider
      displayName='Menus Context'
      value={{
        loading,
        menus,
        getMenuById,
        createMenu,
        deleteMenu,
        editMenu,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
};
