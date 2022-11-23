// https://api.openrouteservice.org/geocode/autocomplete?api_key=5b3ce3597851110001cf624876a8d59872974c48b862c6ff043b5745&text=Toky

import data from "../examples/geocoding/ressources/res_autocomplete";

const geo_autocomplete = async (text) => {
  try {
    // // Call for the autocomplete api
    // const res = await axios({
    //   method: "GET",
    //   url: `https://api.openrouteservice.org/geocode/autocomplete?api_key=${process.env.OPEN_ROUTE_SERVICE_KEY}&text=${text}`,
    // });
    // const data = res.data;

    const autocomplete_data = {
      textQuery: data.geocoding.query.text,
      features: data.features.map((el) => {
        return {
          coordinates: el.geometry.coordinates.reverse(),
          label: el.properties.label,
        };
      }),
      labels: data.features.map((el) => el.properties.label),
    };

    return autocomplete_data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = async function (text) {
  const data = await geo_autocomplete(text);
  return data;
};
