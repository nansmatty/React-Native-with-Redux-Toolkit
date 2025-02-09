import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store/store';
import {
  addTask,
  deleteTask,
  fetchAllTasks,
  ITask,
  toggleTask,
} from '../store/slices/taskSlice';
import Animated, {
  FadeInRight,
  FadeOutLeft,
  LinearTransition,
} from 'react-native-reanimated';

const TaskList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const {tasks, status} = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    if (status === 'IDLE') dispatch(fetchAllTasks());
  }, [status, dispatch]);

  const handleAddNewtask = () => {
    if (newTaskTitle.trim()) {
      dispatch(
        addTask({
          title: newTaskTitle.trim(),
          completed: false,
        }),
      );
      setNewTaskTitle('');
      setIsModalVisible(false);
    }
  };

  const handleRenderTask = ({item}: {item: ITask}) => (
    <Animated.View
      entering={FadeInRight}
      exiting={FadeOutLeft}
      layout={LinearTransition.springify()}>
      <TouchableOpacity
        style={[styles.tasks, item.completed && {opacity: 0.7}]}
        onPress={() => dispatch(toggleTask(item.id))}>
        <Text
          style={[
            styles.btnText,
            {textTransform: 'uppercase'},
            item.completed && {textDecorationLine: 'line-through'},
          ]}>
          {item.title}
        </Text>
        <TouchableOpacity
          style={[styles.closeBtn, {elevation: 0, backgroundColor: '#ff00ee'}]}
          onPress={() => handleDeleteTask(item.id)}>
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );

  const handleDeleteTask = (taskId: string) => {
    Alert.alert('Delete task', 'Are you sure you want to delete this task!', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => dispatch(deleteTask(taskId)),
      },
    ]);
  };

  return (
    <View style={styles.sectionContainer}>
      <FlatList
        data={tasks}
        renderItem={handleRenderTask}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setIsModalVisible(true)}>
        <Text style={[styles.btnText, {fontSize: 14}]}>Add</Text>
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}>
        <KeyboardAvoidingView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Task</Text>
              {/* <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setIsModalVisible(false)}>
                <Text style={[styles.btnText, {fontSize: 10}]}>Close</Text>
              </TouchableOpacity> */}
            </View>
            <TextInput
              style={styles.inputText}
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
              placeholder="Enter Task Title"
              placeholderTextColor="#999"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.closeBtn, {backgroundColor: '#ff00ee'}]}
                onPress={handleAddNewtask}>
                <Text
                  style={[styles.btnText, {fontSize: 11, letterSpacing: 1.2}]}>
                  Add New Task
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.closeBtn, {backgroundColor: '#6200ee'}]}
                onPress={() => setIsModalVisible(false)}>
                <Text
                  style={[styles.btnText, {fontSize: 11, letterSpacing: 1.2}]}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addBtn: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#6200ee',
    width: 80,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  modalButtons: {
    gap: 10,
    flexDirection: 'row',
  },

  closeBtn: {
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
  },

  tasks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#7e22ce',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
  },
});

export default TaskList;
