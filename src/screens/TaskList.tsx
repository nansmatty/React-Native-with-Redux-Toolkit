import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const TaskList: React.FC = () => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>TaskList</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 15,
    minHeight: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TaskList;
