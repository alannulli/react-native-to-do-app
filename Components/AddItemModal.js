import React, { useState } from 'react';

import { StyleSheet, Text, View, TextInput, Modal, Pressable} from 'react-native';

import { v4 as uuidv4 } from 'uuid';


export default function AddItemModal({itemList, setItemList}) {
    const [addItemModalVisible, setAddItemModalVisible] = useState(false);

    // input fields for adding new item
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState(new Date().getDate())

    const handleAddItem = () => {
        if (title.length > 0) {
          const item = {
            key: uuidv4(),
            title: title,
            description: description,
            date: date,
            done: false
          }
          setItemList([...itemList, item])
          setTitle('')
          setDescription('')
          setDate(new Date().getDate())
        }
      }

    return (
        <View>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setAddItemModalVisible(true)}
            >
            <Text style={styles.textStyle}>Show Modal</Text>
          </Pressable>
          <Modal
            animationType="slide"
            transparent={false}
            visible={addItemModalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setAddItemModalVisible(!addItemModalVisible);
            }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Text>Add Bucket List Item </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={title => setTitle(title)}
                  value={title}
                  onSubmitEditing={handleAddItem}
                  />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setAddItemModalVisible(!addItemModalVisible)}
                >
                <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
            </View>
          </View>
          </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 360,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
})