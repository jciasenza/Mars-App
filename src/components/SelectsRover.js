import React, { useState } from "react";
import SelectsList from "./SelectsList";
import { useMarsPhotos } from "../hooks/useMarsPhotos";

/**
 * SelectsRover — Componente alternativo/legacy de exploración de fotos.
 * Usa useMarsPhotos para centralizar las llamadas a la API.
 */
const SelectsRover = () => {
  const [rover, setRover] = useState("curiosity");
  const [sol, setSol] = useState("1");
  const [camera, setCamera] = useState("fhaz");

  const { photos, loading, error } = useMarsPhotos({ rover, sol, camera, mode: "sol" });

  return (
    <div className="App-header">
      <h2>API NASA</h2>
      <h3>Fotos de Marte</h3>

      <div className="select">
        <label htmlFor="rover-select">Rover</label>
        <select
          id="rover-select"
          onChange={(e) => setRover(e.target.value)}
          defaultValue="curiosity"
        >
          <option value="curiosity">Curiosity</option>
          <option value="spirit">Spirit</option>
          <option value="opportunity">Opportunity</option>
        </select>
      </div>

      {rover && (
        <SelectsList
          handleChange={(e) => setSol(e.target.value)}
          photos={photos}
          loading={loading}
          error={error}
        />
      )}

      {sol && (
        <div className="select">
          <label htmlFor="camera-select">Cámara</label>
          <select id="camera-select" onChange={(e) => setCamera(e.target.value)}>
            <option value="fhaz">FHAZ</option>
            <option value="rhaz">RHAZ</option>
            <option value="mast">MAST</option>
            <option value="navcam">NAVCAM</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default SelectsRover;
