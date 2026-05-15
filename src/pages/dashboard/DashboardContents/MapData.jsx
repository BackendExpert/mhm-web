import React from "react";
import {
    MapContainer,
    TileLayer,
    CircleMarker,
    Popup,
} from "react-leaflet";

const COLORS = [
    "#6366f1",
    "#8b5cf6",
    "#06b6d4",
    "#14b8a6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
];

const LOCATIONS = [
    {
        name: "Colombo Factory",
        lat: 6.9271,
        lng: 79.8612,
    },
    {
        name: "Kandy Factory",
        lat: 7.2906,
        lng: 80.6337,
    },
    {
        name: "Galle Factory",
        lat: 6.0535,
        lng: 80.2210,
    },
    {
        name: "Jaffna Factory",
        lat: 9.6615,
        lng: 80.0255,
    },

];

const MapData = () => {

    const hideList =
        window.location.pathname === "/dashboard/analytics";

    const mapData = LOCATIONS.map(
        (location, index) => ({
            ...location,
            color: COLORS[index % COLORS.length],
        })
    );

    return (
        <div className="w-full">

            <div className="overflow-hidden rounded-xl shadow-sm">

                <MapContainer
                    center={[7.8731, 80.7718]}
                    zoom={7}
                    style={{
                        height: "500px",
                        width: "100%",
                    }}
                >

                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {mapData.map((location, index) => (

                        <CircleMarker
                            key={index}
                            center={[
                                location.lat,
                                location.lng,
                            ]}
                            radius={8}
                            pathOptions={{
                                color: location.color,
                                fillColor: location.color,
                                fillOpacity: 1,
                            }}
                        >

                            <Popup>

                                <div className="font-medium">
                                    {location.name}
                                </div>

                            </Popup>

                        </CircleMarker>

                    ))}

                </MapContainer>

            </div>

            {!hideList && (

                <div className="mt-5 grid grid-cols-2 gap-3">

                    {mapData.map(
                        (location, index) => (

                            <div
                                key={index}
                                className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm"
                            >

                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{
                                        background:
                                            location.color,
                                    }}
                                />

                                <span className="text-sm font-medium text-gray-600">
                                    {location.name}
                                </span>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>
    );
};

export default MapData;