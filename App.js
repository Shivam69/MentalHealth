import React from 'react';
import BottomNavigation from './src/navigation/BottomNavigation';
import { StatusBar, StyleSheet,SafeAreaView } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#194b5f'} />
      <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:'#194b5f'}
})
export default App;