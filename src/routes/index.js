import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Banner from "../components/Banner";
import SelectsAnidados from "../components/SelectsAnidados";
import { useState } from "react";
import Favorites from "../pages/Favorites/Favorites";
import FavoritePhotos from "../pages/Favorites/FavoritePhotos";

const Rutas = () => {
  const [select, setSelect] = useState(true);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/inicio" element={<Banner />} />
      <Route
        path="/sol"
        element={
          <SelectsAnidados
            onChange={() => { setSelect(false); }}
            select={select}
          />
        }
      />
      <Route
        path="/terrestre"
        element={
          <SelectsAnidados
            onChange={() => { setSelect(true); }}
            select={false}
          />
        }
      />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/favorite-photos" element={<FavoritePhotos />} />
    </Routes>
  );
};
export default Rutas;
