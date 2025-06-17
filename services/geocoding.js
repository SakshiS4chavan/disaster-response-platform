import axios from 'axios';

export const geocodeLocation = async (locationName) => {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/geocode/json',
      {
        params: {
          address: locationName,
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      }
    );
    const { lat, lng } = response.data.results[0].geometry.location;
    return { lat, lng };
  } catch (error) {
    throw new Error('Geocoding failed');
  }
};
