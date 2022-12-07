import axios from "axios";
// import data from "../examples/route/ressources/direction";

async function routing(startLnglat, endLnglat, profile) {
  try {
    const res = await axios({
      method: "GET",
      url: `https://api.openrouteservice.org/v2/directions/${profile}?api_key=${process.env.OPEN_ROUTE_SERVICE_KEY}&start=${startLnglat}&end=${endLnglat}`,
    });
    const data = res.data;

    const bounds = [
      [data.bbox[0], data.bbox[1]],
      [data.bbox[2], data.bbox[3]],
    ];

    const usedData = {
      bounding: bounds.map((el) => el.reverse()),
      summary: data?.features[0].properties.summary,
      query: data.metadata.query,
      lineString: data.features[0].geometry.coordinates.map((el) =>
        el.reverse()
      ),
    };

    return usedData;
  } catch (err) {
    console.log(err);
  }
}

export default (startPoint, endPoint, profile = "driving-car") => {
  if (!startPoint || !endPoint) return;
  if (typeof startPoint !== "object" || typeof endPoint !== "object") return;

  const _startLnglat = startPoint.reverse().join(",");
  const _endLnglat = endPoint.reverse().join(",");

  return routing(_startLnglat, _endLnglat, profile);
};
