"use client";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCountries } from "../lib/getCountries";
import { icon } from "leaflet";

const ICON = icon({
  iconUrl: "https://static.thenounproject.com/png/335079-200.png",
  iconSize: [50, 50],
});

export default function Map({ locationValue }: { locationValue: string }) {
  const { getCountryByValue } = useCountries();
  const latLang = getCountryByValue(locationValue)?.latLang;

  return (
    <MapContainer
      className="h-[50vh] z-0 relative"
      scrollWheelZoom={false}
      center={latLang ?? [52.505, -0.09]}
      zoom={8}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker icon={ICON} position={latLang ?? [52.505, -0.09]} />
    </MapContainer>
  );
}
