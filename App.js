import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View,
  SafeAreaView, ScrollView } from 'react-native';
import { Card, Title, Checkbox, Text } from 'react-native-paper';

import { v4 as uuidv4 } from 'uuid';

import AddItemModal from './Components/AddItemModal.js';
import EditItemModal from './Components/EditItemModal.js';

const placeholderItemList = [
  {
    key: uuidv4(),
    title: 'Graduate on time',
    description: 'Try and get at least a 3.5 GPA but if not it is okay because GPA is just a number!',
    date: new Date('05/21/2023'),
    done: false
  },
  {
    key: uuidv4(),
    title: 'Try More Restaurant Week Foods',
    description: 'Go back to Maru but try a few more!',
    date: new Date(),
    done: false
  },
]

export default function App() {
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

  // useEffect(() => {
  //   let newList = itemList
  //   newList.sort((a,b) => {
  //     return new Date(a.date).getTime() - new Date(b.date).getTime()
  //     })
  //   setItemList(newList)
  // }, [itemList])

  return (
    <SafeAreaView style={styles.container}>
        <AddItemModal
          itemList={itemList}
          setItemList={setItemList}
          />
        <View>
          <Card style={styles.card}>
            <Card.Content>
              <Title>Bucket List Items</Title>
              <ScrollView style={styles.scrollView}>
                {itemList.filter(item => !item.done).map((item) => {
                    return (
                      <EditItemModal
                        itemKey={item.key}
                        itemTitle={item.title}
                        itemDescription={item.description}
                        itemDate={item.date}
                        itemList={itemList}
                        setItemList={setItemList}
                        handleFinish={handleFinish}
                        />
                      );
                  })}
              </ScrollView>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <Title>Finished Bucket List Items</Title>
              <ScrollView>
                {itemList.filter(item => item.done).sort((a,b) => {
                  return new Date(a.date).getTime() - new Date(b.date).getTime()
                  }).map((item) => {
                  return (
                    <View key={item.key} style={styles.todo}>
                      <View style={styles.textBox}>
                        <Text variant="titleMedium">{item.title}</Text>
                        <Text variant="labelMedium">{item.date.toDateString()}</Text>
                      </View>
                      <Checkbox status={'checked'} onPress={() => handleUndo(item.key)}/>
                    </View>
                    );
                  })}
              </ScrollView>
            </Card.Content>
          </Card>
        </View>
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

  card: {
    margin: '1vh',
    minHeight: '40vh',
    backgroundColor: 'pink'
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
    borderRadius: 20,
  },
  textBox: {
    width: 275,
  },
});
