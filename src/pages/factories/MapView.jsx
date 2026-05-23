import React from 'react'

const MapView = ({ lat, lng }) => {
    return (
        <div className="w-full h-[400px] rounded-lg overflow-hidden">
            <iframe
                title="Google Map"
                width="100%"
                height="100%"
                frameBorder="0"
                src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
                allowFullScreen
            />
        </div>
    )
}

export default MapView