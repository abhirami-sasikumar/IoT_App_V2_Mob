// SafeScreen.js
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SafeScreen({ children, style }) {
  return (
    <SafeAreaView style={[{ flex: 1 }, style]}>
      {children}
    </SafeAreaView>
  );
}
