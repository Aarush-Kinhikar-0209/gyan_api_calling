import { createAction } from "@reduxjs/toolkit";

export const loginSuccess = createAction("LoginSuccess");
export const logout = createAction("Logout");
export const registerSuccess = createAction("RegisterSuccess");
export const loadUserSuccess = createAction("LoadUserSuccess");