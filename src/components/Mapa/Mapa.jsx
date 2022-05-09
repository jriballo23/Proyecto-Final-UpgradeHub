import React, {useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Mapa.scss";
import "leaflet/dist/leaflet.css";
import { provinces } from "../../provinces";
import L from "leaflet";

const Mapa = ({cp}) => {

  const [dPosition, setDPosition] = useState(false);

  const myIcon = L.icon({
    iconUrl: "/circulo.png",
    iconSize: [32, 32],
    iconAnchor: [32, 32],
    iconAnchorSize: [32, 32],
    popupAnchor: [-15, -30],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
  });
  // const pepito = localStorage.getItem("user")
  // let userParsed = JSON.parse(pepito);
  // let savedLocation = userParsed.location;
  // console.log(savedLocation);

  // Hacer el filter al traer el CP, poner localizacion en productos o popular usuarios a productos

// console.log(provinces.provinces);
const pepe = (lon, lat) => {
  console.log(dPosition);
  console.log([lon, lat]);
  console.log(dPosition !== [lon, lat]);
if (dPosition[0] !== lon && dPosition[1] !== lat){setDPosition([lon, lat])}
} 
provinces.provinces.map((province) => {
  let a = province.codigopostalid;
  if (parseInt(a) === parseInt(cp) && dPosition !== [province.lon, province.lat]){
    
    pepe(province.lon, province.lat);
          }
})

  return (
    <div className="map-container">
      {dPosition && <MapContainer
        className="map"
        center={dPosition}
        zoom={12}
        scrollWheelZoom={true}
        zoomAnimation={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {provinces.provinces.map((province) => {
          let a = province.codigopostalid;
          // if (parseInt(a) === parseInt(cp) && dPosition !== [province.lon, province.lat]){
            
          //   pepe(province.lon, province.lat);
          //         }
                  
          return (
            (parseInt(a) === parseInt(cp)) && 
            <Marker key={JSON.stringify(province)} position={[province.lon, province.lat]} icon={myIcon}>

              <Popup>{province.poblacion}</Popup></Marker>

          );
        }
        )
      }
      </MapContainer>}
    </div>
  );
};


export default Mapa;