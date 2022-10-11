import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Keyboard, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [todo, setTodo] = useState('')
  const [todoList, setTodoList] = useState([])

  const handleAddTodo = () => {
    if (todo.length > 0) {
      const task = {
        key: uuidv4(),
        text: todo,
      }
      setTodoList([...todoList, task])
      setTodo('')
      Keyboard.dismiss()
    }
  }

  const handleDelete = (key) => {
    setTodoList(todoList => {
      return todoList.filter(task => task.key != key)
    })
  }

  return (
    <View style={styles.container}>
      <Text>Add Todo </Text>
      <TextInput
      style={styles.input}
      onChangeText={text => setTodo(text)}
      value={todo}
      onSubmitEditing={handleAddTodo}
      />
      <Text>Today's Schedule</Text>
      <View>
        {todoList.map((task) => {
          return (
            <View key={task.key}>
              <Text style={styles.todo}>{task.text} <Button onPress={() => handleDelete(task.key)} title="Delete">=</Button></Text>
            </View>
            );
          })
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  todo: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
    width: 180,
    marginTop: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    display: 'flex',
  }
});
