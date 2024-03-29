import { useToggle } from 'hooks';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { makeReq, handleCatch } from 'utils/makeReq';

export const LOCALSTORAGE_TOKEN_KEY = 'restaurant-token';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  // let history = useHistory();
  const [loading, toggleLoading] = useToggle(true);
  let tokenLocal;

  try {
    tokenLocal = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
  } catch (err) {
    tokenLocal = null;
  }

  const [token, setToken] = useState(tokenLocal);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getMe();
  }, []);

  const getMe = async () => {
    try {
      const res = await makeReq(`/users/me`, {}, 'GET');
      // console.log(`res`, res);

      setUser(res.user);
    } catch (err) {
      setToken(null);
      localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
      localStorage.removeItem('user');

      // if (history.location !== '/') history.push('/');
    } finally {
      toggleLoading();
    }
  };

  const updateMe = async (newProfile, setState) => {
    try {
      const res = await makeReq(
        `/users/me`,
        { body: { ...newProfile } },
        'PATCH'
      );
      // console.log(`res`, res);

      setUser(res.user);
      toast.success('Profile Updates Successfully !');
    } catch (err) {
      setState(user);
      handleCatch(err);
    }
  };

  const signInUser = (tk, us) => {
    // console.log(`tk`, tk);
    // console.log(`us`, us);

    window.localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, tk);

    setTimeout(() => {
      setToken(tk);
      setUser(us);
    }, 1000);
  };

  const logoutUser = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem('user');
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);

    // setTimeout(() => {
    //   window.location.href = '/';
    // }, 1000);
  };

  return (
    <AuthContext.Provider
      displayName='Auth Context'
      value={{
        token,
        setToken,
        logoutUser,
        user,
        setUser,
        signInUser,
        updateMe,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
