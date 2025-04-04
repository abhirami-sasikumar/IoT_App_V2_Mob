
// import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
// import { styles } from "./Otp.style";
// import { Icfosslogo } from "../../../Components/Icfosslogo/Icfosslogo";

// import Logo from "../../../Components/Logo/Logo";


// const ResetOtp = () => {


//   return (
//     <>
//       <View>
//         <Logo />
//       </View>
//       <View style={styles.container}>
//         <Text style={styles.heading}>Reset Your Password</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Enter OTP"
//           value={otp}
//           onChangeText={setOtp}
//           keyboardType="numeric"
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="New Password"
//           value={newPassword}
//           onChangeText={setNewPassword}
//           secureTextEntry
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChangeText={setConfirmPassword}
//           secureTextEntry
//         />

//         <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
//           <Text style={styles.buttonText}>Reset Password</Text>
//         </TouchableOpacity>
//         <View style={styles.footer}>
//           <Icfosslogo />
//         </View>
//       </View>
//     </>
//   );
// };

// export default ResetOtp;