import React from 'react';
import {StyleSheet, View} from 'react-native';

import {AppText} from '../../../components/common/AppText';

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <AppText variant="h1">Profile</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});