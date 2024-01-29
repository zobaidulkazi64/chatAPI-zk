// utils/authUtils.js

function isAuthenticated() {
   const token = localStorage.getItem('token');
   return !!token;
 }
 
 module.exports = {
   isAuthenticated,
 };
 