import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";
import { moderateVerticalScale, scale, verticalScale } from "react-native-size-matters";
import backArrow from "../assets/BackArrow.png";
import DropDown from "./components/Dropdown/Dropdown";
import Loading from "../Components/Loading/Loading";
import API from "../Api";
import SafeScreen from "../Components/SafeArea/SafeArea";

const ChartComponent = () => {
  const nav = useNavigation();
  const { params } = useRoute();
  const { clusterId, parameterName, locationName } = params || {};

  const [time, setTime] = useState(3);
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [min, setMin] = useState({ value: 0, time: "" });
  const [max, setMax] = useState({ value: 0, time: "" });
  const [unit, setUnit] = useState("");
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };
    lockOrientation();

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        setDisable(true);

        const response = await API.post("/getValuesByInterval", {
          clusterId,
          parameterName,
          location: locationName,
          interval: `${time}h`,
        });

        if (response.data.success) {
          const { values, unit } = response.data.data;

          let minEntry = values[0];
          let maxEntry = values[0];

          values.forEach((item) => {
            if (item.value < minEntry.value) minEntry = item;
            if (item.value > maxEntry.value) maxEntry = item;
          });

          setMin({ value: minEntry.value, time: minEntry.time });
          setMax({ value: maxEntry.value, time: maxEntry.time });
          setUnit(unit);

          const chartHtml = generateHtmlContent(values, parameterName, unit);
          setHtmlContent(chartHtml);
        }

        setLoading(false);
        setDisable(false);
      } catch (error) {
        console.error("Error fetching chart data:", error.message);
        setLoading(false);
        setDisable(false);
      }
    };

    fetchChartData();
  }, [time]);

  const generateHtmlContent = (data, name, unit) => {
    const chartData = data.map(
      (item) => `{ x: new Date("${item.time}"), y: ${item.value} }`
    );

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://api.app.openiot.in/static/chart.js@4.4.1"></script>
          <script src="https://api.app.openiot.in/static/chartjs-adapter-date-fns@3.0.0"></script>
          <style>
            html, body { margin: 0; padding: 0; height: 100%; }
            canvas { width: 100% !important; height: 100% !important; display: block; }
          </style>
        </head>
        <body>
          <canvas id="chart"></canvas>
          <script>
            const { LineElement, PointElement, TimeScale, LinearScale, Tooltip, Legend, Filler } = Chart;
            Chart.register(LineElement, PointElement, TimeScale, LinearScale, Tooltip, Legend, Filler);
            const data = [${chartData.join(",")}];
            const ctx = document.getElementById('chart').getContext('2d');
            new Chart(ctx, {
              type: 'line',
              data: {
                datasets: [{
                  label: '${name} (${unit})',
                  data: data,
                  fill: true,
                  backgroundColor: 'rgba(232, 169, 195, 0.5)', 
                  borderColor: '#810541',
                  pointRadius: 0,
                  pointHoverRadius: 0,
                  tension: 0.4,
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    type: 'time',
                    time: { unit: 'hour', displayFormats: { hour: 'HH:mm' }, stepSize: 1 },
                    title: { display: true, text: 'Time' },
                    ticks: { autoSkip: true, maxTicksLimit: 10 }
                  },
                  y: {
                    title: { display: true, text: '${name} (${unit})' },
                    min: 0 // This ensures the y-axis starts from zero
                  }
                },
                plugins: {
                  legend: { display: false },
                  tooltip: { mode: 'index', intersect: false }
                }
              }
            });
          </script>
        </body>
      </html>
    `;
  };

  return (
    <SafeScreen>
    <View style={{ flex: 1 }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => nav.goBack()}>
              <Image source={backArrow} style={styles.backArrow} />
            </TouchableOpacity>
           
            <View style={styles.headerTextContainer}>
              <Text style={styles.smallHeaderText}>{locationName} - {parameterName}</Text>
            </View>
            <DropDown time={time} setTime={setTime} disable={disable} />
          </View>
          <WebView
            style={{ flex: 1 }}
            originWhitelist={["*"]}
            source={{ html: htmlContent }}
          />
          <View style={styles.rowContainer}>
            <View style={styles.columnMin}>
              <Text style={styles.columnText}>Min: {min.value} {unit}</Text>
              <Text style={styles.columnTextSmall}>
                {new Date(min.time).toLocaleString()}
              </Text>
            </View>
            <View style={styles.columnMax}>
              <Text style={styles.columnText}>Max: {max.value} {unit}</Text>
              <Text style={styles.columnTextSmall}>
                {new Date(max.time).toLocaleString()}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: verticalScale(10),
  },
  backArrow: {
    width: verticalScale(24),
    height: scale(24),
    tintColor: '#810541'
  },
  location:{
    marginLeft:moderateVerticalScale(),
    alignItems:"center"

  },
  locationtext:{
    flex:1,
    
    alignItems:"center",
    color: "#810541",
    fontSize: verticalScale(19),
    fontFamily: "Roboto",




  },
  headerTextContainer: {
    flex: 1,
    alignItems: "center",
  },
  smallHeaderText: {
    fontSize: verticalScale(19),
    color: "#810541",
    fontFamily: "Roboto",
  },
  rowContainer: {
    flexDirection: "row",
    width: verticalScale(680),
    height: scale(45),
  },
  columnMin: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B35A82",
  },
  columnMax: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#810541",
  },
  columnText: {
    color: "white",
    fontSize: verticalScale(16),
    fontFamily: "Roboto",
  },
  columnTextSmall: {
    color: "white",
    fontSize: verticalScale(10),
    fontFamily: "Roboto",
  },
});

export default ChartComponent;
