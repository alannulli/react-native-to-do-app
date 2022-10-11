import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View,
  Button, SafeAreaView, ScrollView} from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import { v4 as uuidv4 } from 'uuid';

import AddItemModal from './Components/AddItemModal.js';

// sort later

const placeholderItemList = [
  {
    key: uuidv4(),
    title: 'Graduate on time!',
    description: 'Try and get at least a 3.5 GPA but if not it is okay because it is just a number!',
    date: new Date('May 21, 2023 05:00:00').getDate(),
    done: false
  }
]

export default function App() {
  // item list
  const [itemList, setItemList] = useState(placeholderItemList)

  const handleFinish = (key) => {
    setItemList(itemList.map(item => {
      if (item.key == key) item.done = true
      return item
    }))
  }

  const handleUndo = (key) => {
    setItemList(itemList.map(item => {
      if (item.key == key) item.done = false
      return item
    }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <AddItemModal
          itemList={itemList}
          setItemList={setItemList}
          />
        <View>
          <Text>Today's Schedule</Text>
          <View>
            {itemList.filter(item => !item.done).map((item) => {
              return (
                <View key={item.key}>
                  <View>
                    <Text style={styles.todo} >
                      {item.title}
                      <Button onPress={() => handleFinish(item.key)} title="Done"></Button>
                      </Text>
                  </View>
                  {/* <View>
                    <CheckBox value={item.done} onChange={() => handleFinish(item.key)}/>
                  </View> */}
                </View>
                );
              })}
          </View>
          <View>
            <Text>Finished Bucket List Items</Text>
            <View>
              {itemList.filter(item => item.done).map((item) => {
                return (
                  <View key={item.key}>
                    <Text style={styles.todo}>{item.title} <Button onPress={() => handleUndo(item.key)} title="Undo">=</Button></Text>
                  </View>
                  );
                })}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  sectionTitle: {
    fontSize: 30,
  },

  todo: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
    width: 360,
    marginTop: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    display: 'flex',
  }
});
