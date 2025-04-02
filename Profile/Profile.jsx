// import React, { useState, useEffect, useContext } from "react";
// import 
// import { UserContext } from "../Contexts/UserContext";
// import { User } from "../api/user";
// import { KeyboardAvoidingView, ScrollView, Platform, Keyboard } from "react-native";

// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   TouchableOpacity,
//   Alert,
//   Image,
// } from "react-native";
// import * as ScreenOrientation from "expo-screen-orientation";
// import { Ionicons } from "@expo/vector-icons"; // Importing eye icon

// import { styles } from "./Profile.style";
// import Footer from "../Components/Footer/footer";
// import UserIcon from "../assets/usericon.png";

// import { useNavigation } from "@react-navigation/native";

// const Profile = () => {
//   useEffect(() => {
//     const lockOrientation = async () => {
//       await ScreenOrientation.lockAsync(
//         ScreenOrientation.OrientationLock.PORTRAIT_UP
//       );
//     };

//     lockOrientation();

//     return () => {
//       ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
//     };
//   }, []);

//   const [isChangingPassword, setIsChangingPassword] = useState(false);
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [deletePassword, setDeletePassword] = useState("");
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility for delete account
//   const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false); // State to toggle old password visibility
//   const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false); // State to toggle confirm password visibility

//   const nav = useNavigation();
//   const { user, setUser } = useContext(UserContext);
//   const [isDeletingAccount, setIsDeletingAccount] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await AsyncStorage.clear();
//       nav.reset({
//         index: 0,
//         routes: [{ name: "Login" }],
//       });
//     } catch (error) {
//       Alert.alert("Error", error);
//     }
//   };

//   const handleChangePassword = async () => {
//     if (!oldPassword || !newPassword || !confirmPassword) {
//       Alert.alert("Error", "Please fill out all fields.");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       Alert.alert("Error", "New password and confirm password do not match.");
//       return;
//     }

//     try {
//       const response = await User.changePassword(
//         user.jwtToken,
//         user.email,
//         oldPassword,
//         newPassword
//       );
//       Alert.alert("Success", response.message);
//       setIsChangingPassword(false);
//       setOldPassword("");
//       setNewPassword("");
//       setConfirmPassword("");
//     } catch (error) {
//       Alert.alert(
//         "Error",
//         error.response.data.message || "Failed to update password"
//       );
//     }
//   };

//   const showConfirmAlert = async () => {
//     if (!deletePassword) {
//       Alert.alert("", "Password required");
//       return;
//     }
//     try {
//       Alert.alert(
//         'Confirm Delete',
//         'Are you sure you want to delete your account?',
//         [
//           {
//             text: 'Cancel',
//             style: 'cancel',
//           },
//           {
//             text: 'Confirm',
//             onPress: async () => {
//               try {
//                 const response = await User.deleteAccount(user.jwtToken, user.email, deletePassword);
//                 await AsyncStorage.clear();
//                 Alert.alert("Success", response);
//                 nav.reset({
//                   index: 0,
//                   routes: [{ name: "Login" }],
//                 });
//               }
//               catch (error) {
//                 Alert.alert("", error.response.data.message || "Try again later");
//                 setDeletePassword("");
//               }
//             },
//           },
//         ],
//         { cancelable: true }
//       );
//     }
//     catch (error) {
//       Alert.alert("Error", error.response.data.message || "Try again later");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.content}>
//         <Image source={UserIcon} style={styles.image} />
//         <Text style={styles.label}>{user.name}</Text>
//         <Text style={styles.label}>{user.email}</Text>

//         {!isChangingPassword && !isDeletingAccount ? (
//           <View style={styles.button_view}>
//             <TouchableOpacity
//               style={[styles.button, { backgroundColor: "#B22222" }]}
//               onPress={handleLogout}
//             >
//               <Text style={styles.buttonText}>Logout</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => setIsChangingPassword(true)}
//             >
//               <Text style={styles.buttonText}>Change Password</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.button, { backgroundColor: "#8B0000" }]}
//               onPress={() => setIsDeletingAccount(true)}
//             >
//               <Text style={styles.buttonText}>Delete Account</Text>
//             </TouchableOpacity>
//           </View>
//         ) : isChangingPassword ? (
//           <View>
//             <View style={styles.passwordInputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Old Password"
//                 secureTextEntry={!isOldPasswordVisible}
//                 value={oldPassword}
//                 onChangeText={setOldPassword}
//               />
//               <TouchableOpacity
//                 style={styles.eyeIcon}
//                 onPress={() => setIsOldPasswordVisible(!isOldPasswordVisible)}
//               >
//                 <Ionicons
//                   name={isOldPasswordVisible ? "eye" : "eye-off"}
//                   size={24}
//                   color="gray"
//                 />
//               </TouchableOpacity>
//             </View>

//             <TextInput
//               style={styles.input}
//               placeholder="New Password"
//               secureTextEntry
//               value={newPassword}
//               onChangeText={setNewPassword}
//             />

//             <View style={styles.passwordInputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Confirm Password"
//                 secureTextEntry={!isConfirmPasswordVisible}
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//               />
//               <TouchableOpacity
//                 style={styles.eyeIcon}
//                 onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
//               >
//                 <Ionicons
//                   name={isConfirmPasswordVisible ? "eye" : "eye-off"}
//                   size={24}
//                   color="gray"
//                 />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.buttonContainer}>
//               <TouchableOpacity
//                 style={styles.buttonInside}
//                 onPress={handleChangePassword}
//               >
//                 <Text style={styles.buttonText}>Submit</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.buttonInside, { backgroundColor: "red" }]}
//                 onPress={() => setIsChangingPassword(false)}
//               >
//                 <Text style={styles.buttonText}>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ) : (
//           <View>
//             <View style={styles.passwordInputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter Password to Delete Account"
//                 secureTextEntry={!isPasswordVisible}
//                 value={deletePassword}
//                 onChangeText={setDeletePassword}
//               />
//               <TouchableOpacity
//                 style={styles.eyeIcon}
//                 onPress={() => setIsPasswordVisible(!isPasswordVisible)}
//               >
//                 <Ionicons
//                   name={isPasswordVisible ? "eye" : "eye-off"}
//                   size={24}
//                   color="gray"
//                 />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.buttonContainer}>
//       <TouchableOpacity
//         style={[styles.deleteButton, { backgroundColor: "#8B0000" }]}
//         onPress={showConfirmAlert}
//       >
//         <Text style={styles.buttonText}>Confirm Delete</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[styles.deleteButton, { backgroundColor: "red" }]}
//         onPress={() => setIsDeletingAccount(false)}
//       >
//         <Text style={styles.buttonText}>Cancel</Text>
//       </TouchableOpacity>
//     </View>
//           </View>
//         )}
//       </View>
//       <Footer />
//     </View>
//   );
// };


// export default Profile;