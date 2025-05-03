import { useState } from "react";
import { StyleSheet } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";
import clock from "../../../assets/clock.png";
import { scale, verticalScale } from "react-native-size-matters";

const local_data = [
  {
    value: 3,
    lable: "3 Hr",
    image: clock,
  },
  {
    value: 6,
    lable: "9Hr",
    image: clock,
  },
  {
    value: 12,
    lable: "12Hr",
    image: clock,
  },
  {
    value: 24,
    lable: "24Hr",
    image: clock,
  },
  {
    value: 48,
    lable: "2Days",
    image: clock,
  },
  {
    value: 168,
    lable: "7Days",
    image: clock,
  },
  {
    value: 720,
    lable: "30days",
    image: clock,
  }
];

const DropDown = ({ time, setTime, disable }) => {
  return (
    <SelectCountry
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      imageStyle={styles.imageStyle}
      iconStyle={styles.iconStyle}
      value={time}
      data={local_data}
      valueField="value"
      labelField="lable"
      imageField="image"
      placeholder="Select country"
      onChange={(e) => {
        setTime(e.value);
      }}
      disable={disable}
    />
  );
};

export default DropDown;

const styles = StyleSheet.create({
  dropdown: {
    height: scale(25),
    width: verticalScale(115),
    backgroundColor: "#B35A82",
    borderRadius: 22,
    paddingHorizontal: scale(8),
    position: "absolute",
    right: verticalScale(0),
    marginRight: verticalScale(10),
  },
  imageStyle: {
    width: verticalScale(19),
    height: scale(19.5),
    borderRadius: 12,
    tintColor: "#810541",
  },
  placeholderStyle: {
    fontSize: verticalScale(16),
  },
  selectedTextStyle: {
    fontSize: verticalScale(12),
    color: "#810541",
    fontFamily:"Roboto",
  },
  iconStyle: {
    width: verticalScale(20),
    height: scale(20),
    tintColor: "#810541",
  },
});
