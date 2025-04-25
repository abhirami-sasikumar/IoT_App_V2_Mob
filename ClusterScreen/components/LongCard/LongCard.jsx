import React,{useState} from "react";
import { Text, Image, TouchableOpacity,View,Modal,Pressable,ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Arrow from "../../../assets/arrowIcon.png";
import styles from "./LongCard.style";
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons (or any other icon you want to use)


const LongCard = ({ clusterName, clusterId, clusterDescription }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    if (clusterId) {
      navigation.navigate("Parameters", { clusterId });
    }
  };

  const handleInfoPress = (e) => {
    e.stopPropagation();
    setModalVisible(true);
  };

  return (
    <>
      <TouchableOpacity style={styles.card} onPress={handlePress}>
        <View style={styles.textContainer}>
          <Text style={styles.cardText} numberOfLines={1} ellipsizeMode="tail">
            {clusterName}
          </Text>
          <TouchableOpacity onPress={handleInfoPress} style={styles.infoButtonContainer}>
            <Icon name="information-circle" size={20} color="#810541" />
          </TouchableOpacity>
        </View>
        <Image source={Arrow} style={styles.arrow} />
      </TouchableOpacity>

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay} />
        <View style={styles.modalContent}>
          <ScrollView>
          <Text style={{ fontSize: 16, marginBottom: 20, textAlign:"justify"}}>
            {clusterDescription ? clusterDescription : "No description available for this cluster."}
          </Text>
          
          </ScrollView>
          <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={{ color: "white" }}>Close</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

 export default LongCard;