import { Text, View, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import API from "../../Api";
import LocationCard from "./SubComponent/LocationCard";
import Styles from "./ParaCard.style";

const ParaCard = ({ clusters, para, lat, lng }) => {
  const [nearestDevice, setNearestDevice] = useState(null);
  const styles = Styles();

  const coordinateDistance = (lat1, lon1, lat2, lon2) => {
    const radLat1 = (lat1 * Math.PI) / 180;
    const radLon1 = (lon1 * Math.PI) / 180;
    const radLat2 = (lat2 * Math.PI) / 180;
    const radLon2 = (lon2 * Math.PI) / 180;
    const R = 6371000; // meters
    const dLat = radLat2 - radLat1;
    const dLon = radLon2 - radLon1;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return +(R * c).toFixed(2);
  };

  const fetchNearestDevice = async () => {
    const collected = [];

    await Promise.all(
      clusters.map(async (clus) => {
        try {
          const res = await API.get(
            `/get_location/${clus._id}/${encodeURIComponent(para)}`
          );
          const locationData = res.data.locations || [];

          locationData.forEach((loc) => {
            if (loc.latitude != null && loc.longitude != null) {
              collected.push({
                cluster: clus.clusterName,
                clusId: clus._id,
                name: loc.name,
                Latitude: loc.latitude,
                Longitude: loc.longitude,
                distance: coordinateDistance(
                  lat,
                  lng,
                  loc.latitude,
                  loc.longitude
                ),
              });
            }
          });
        } catch (err) {
          if (err.response?.status !== 404) {
            console.error(
              `Error fetching ${para} from ${clus._id}:`,
              err.message
            );
          }
        }
      })
    );

    const sorted = collected.sort((a, b) => a.distance - b.distance);
    setNearestDevice(sorted[0] || null);
  };

  useEffect(() => {
    let interval;
    let isCancelled = false;

    const run = async () => {
      if (!isCancelled) await fetchNearestDevice();
    };

    if (clusters && para) {
      run();
      interval = setInterval(run, 5000); // Adjust polling interval if needed
    }

    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, [clusters, para, lat, lng]);

  if (!nearestDevice) return null;

  return (
    <ScrollView horizontal={true} style={styles.wrapper}>
      <LocationCard
        location={nearestDevice.name}
        paraName={para}
        clusterId={nearestDevice.clusId}
      />
      <View style={styles.cardWrapper}>
        <View style={styles.metaInfo}>
          <Text style={styles.label}>Cluster: {nearestDevice.cluster}</Text>
          <Text style={styles.label}>Location: {nearestDevice.name}</Text>
          <Text style={styles.label}>
            Coords: {nearestDevice.Latitude.toFixed(5)},{" "}
            {nearestDevice.Longitude.toFixed(5)}
          </Text>
          <Text style={styles.label}>
            Distance: {nearestDevice.distance/1000} km
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ParaCard;
