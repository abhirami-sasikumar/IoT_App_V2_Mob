import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { scale } from "react-native-size-matters";
import API from "../../../Api";
import Styles from "./LocationCard.style";
// import Icon from '../../../assets/icons/Icon';

const LocationCard = ({ location, paraName, clusterId }) => {
  const styles = Styles(); // ✅ no theme passed
  const navigation = useNavigation();

  const [details, setDetails] = useState({
    latestValue: "N/A",
    time: "N/A",
    unit: "",
    isChart: false,
    hideDevice: false,
  });

  const fetchDetails = async () => {
    try {
      const res = await API.post(`/get_latest_value`, {
        clusterId,
        parameterName: paraName,
        location,
      });

      const data = res.data?.data || {};
      const latestValue = data.latestValue || {};

      setDetails({
        latestValue: latestValue.value ?? "N/A",
        time: latestValue.time ?? "N/A",
        unit: data.unit || "",
        isChart: data.isChart ?? false,
        hideDevice: data.hideDevice ?? false,
      });
    } catch (err) {
      console.error(
        `Error fetching value for ${paraName} at ${location}:`,
        err.message
      );
      setDetails({
        latestValue: "N/A",
        time: "N/A",
        unit: "",
        isChart: false,
        hideDevice: false,
      });
    }
  };

  useEffect(() => {
    let interval;
    if (clusterId && paraName) {
      fetchDetails();
      interval = setInterval(fetchDetails, 5000);
    }
    return () => clearInterval(interval);
  }, [clusterId, paraName]);

  const handleChartPress = () => {
    if (details.isChart && !details.hideDevice) {
      navigation.navigate("Chart", {
        clusterId,
        parameterName: paraName,
        locationName: location,
      });
    }
  };

  const formattedTime =
    details.time !== "N/A" ? moment(details.time).format("h:mm A") : "N/A";

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleChartPress}
      disabled={!details.isChart || details.hideDevice}
    >
      {/* {details.isChart && !details.hideDevice && (
        <Icon
          name="arrow-up-right"
          size={scale(16)}
          color="#000" // fallback static color
          style={{ alignSelf: "flex-end" }}
        />
      )} */}
      <Text style={styles.parameterName}>{paraName}</Text>

      <View style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}>
        <View style={styles.valueContainer}>
          {details.hideDevice ? (
            <Text>Under Maintenance</Text>
          ) : (
            <>
              <Text style={styles.value}>{details.latestValue}</Text>
              <Text style={styles.value}>{details.unit}</Text>
            </>
          )}
        </View>

        {!details.hideDevice && details.time !== "N/A" && (
          <View flexDirection="row" alignItems="center">
            <View style={styles.timeIcon}>
              {/* <Icon name="history" size={scale(12)} color="#000" /> */}
            </View>
            <Text style={styles.timeText}>{formattedTime}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default LocationCard;
