import { LOGOUT, SET_AUTH } from "../actions/auth";

const savedJwt = localStorage.getItem("auth");

export const initialState = {
  isLoggedIn: !!savedJwt,
  jwt: savedJwt || null, // token enviar en cada request HTTP (cabecera) + storage
};
export const authReducer = (state, action) => {
  switch (action.type) {
    case SET_AUTH: {
      const { jwt } = action.payload;
      return {
        isLoggedIn: true, // fix: era "IsloggedIn" (inconsistente con initialState)
        jwt,
      };
    }
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
