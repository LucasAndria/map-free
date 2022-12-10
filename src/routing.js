import axios from 'axios';
// import data from "../examples/route/ressources/direction";
/* This code is a JavaScript module that exports a function for retrieving routing information from the OpenRouteService API. The function takes three arguments: startPoint, endPoint, and profile. startPoint and endPoint are required and should be objects representing the latitude and longitude of the starting and ending points of the route. profile is an optional argument that specifies the type of transportation to use when calculating the route. If profile is not specified, the default value is "driving-car".

The exported function calls an async function named routing, which sends a GET request to the OpenRouteService API with the provided arguments. The response is parsed to extract relevant information such as the bounding box of the route and the route's summary. This information is then returned by the routing function.

The code also includes a try-catch block to handle any errors that may occur when making the API request. If an error occurs, it will be logged to the console. */
/* to display a routing from point A to a point B */
async function routing(startLnglat, endLnglat, profile) {
  try {
    const res = await axios({
      method: 'GET',
      url: `https://api.openrouteservice.org/v2/directions/${profile}?api_key=${process.env.OPEN_ROUTE_SERVICE_KEY}&start=${startLnglat}&end=${endLnglat}`
    });
    const data = res.data;

    const bounds = [
      [data.bbox[0], data.bbox[1]],
      [data.bbox[2], data.bbox[3]]
    ];

    const usedData = {
      bounding: bounds.map((el) => el.reverse()),
      summary: data?.features[0].properties.summary,
      query: data.metadata.query,
      lineString: data.features[0].geometry.coordinates.map((el) =>
        el.reverse()
      )
    };

    return usedData;
  } catch (err) {
    console.log(err);
  }
}

export default (startPoint, endPoint, profile = 'driving-car') => {
  if (!startPoint || !endPoint) return;
  if (typeof startPoint !== 'object' || typeof endPoint !== 'object') return;

  const _startLnglat = startPoint.reverse().join(',');
  const _endLnglat = endPoint.reverse().join(',');

  return routing(_startLnglat, _endLnglat, profile);
};
