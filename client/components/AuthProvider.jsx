// import React, { useState, useEffect, useContext, createContext } from 'react';
// import fetchUserData from '../utils/fetchUserData.js';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();
// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const Navigate = useNavigate();
  
//   useEffect(() => {
//     if (localStorage.getItem('isLoggedIn') && Date.now() < Number(localStorage.getItem('isLoggedIn'))) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   useEffect(() => {
//     if (!isLoggedIn) {
//       Navigate('/auth');
//     } else {
//       fetchUserData((data) => {
//         dispatch(actions.setUserDataActionCreator(data));
//       });
//     }
//   }, [isLoggedIn]);

//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn,
//         setIsLoggedIn,
//         Navigate
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);
