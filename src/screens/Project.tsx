import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Projects: React.FC = () => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Projects</Text>
      <View style={styles.viewBox}>
        <Text style={styles.homeWork}>
          1. Try to apply all the basic component that we learned so far.
        </Text>
        <Text style={styles.homeWork}>
          2. Create sub-screens in projects using stack navigation.
        </Text>
        <Text style={styles.homeWork}>
          3. Apply some basic animation and some combination properties from
          reanimated.
        </Text>
        <Text style={styles.homeWork}>
          4. Integrate third party API in one of the sub-screen and context
          there for dark theme.
        </Text>
        <Text style={styles.homeWork}>
          5. Create one form in another sub-screen and manage the state using
          redux
        </Text>
      </View>
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

  viewBox: {
    marginTop: 20,
    padding: 8,
  },

  homeWork: {
    backgroundColor: '#9d174d',
    padding: 15,
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: 'white',
    borderRadius: 20,
  },
});

export default Projects;
