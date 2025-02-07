import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TaskList from '../screens/TaskList';
import Projects from '../screens/Project';

export type TRootNavigatorParamsList = {
  Tasks: undefined;
  Projects: undefined;
};

const Tab = createBottomTabNavigator<TRootNavigatorParamsList>();

const RootNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tasks" component={TaskList} />
      <Tab.Screen name="Projects" component={Projects} />
    </Tab.Navigator>
  );
};

export default RootNavigator;
