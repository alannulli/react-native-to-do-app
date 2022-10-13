import React, { useState } from 'react';

import { StyleSheet, View, Modal} from 'react-native';
import { Button, Text, TextInput, Snackbar } from 'react-native-paper';

import { v4 as uuidv4 } from 'uuid';
import DatePicker from "@dietime/react-native-date-picker";

export default function AddItemModal({itemList, setItemList, handleAdd}) {
    const [addItemModalVisible, setAddItemModalVisible] = useState(false);

    // input fields for adding new item
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState(new Date())

    const [snackbar, setSnackbar] = useState(false)

    // const handleAddItem = () => {
    //     // cancels add if missing title
    //     if (title.length == 0) {
    //         console.log("incorrect input") // can make inputs highlighted too to show required*
    //         return
    //     }

    //     const item = {
    //         key: uuidv4(),
    //         title: title,
    //         description: description,
    //         date: date,
    //         done: false
    //     }

    //     // let sortedList = [...itemList, item].sort((a,b) => {
    //     //   return new Date(a.date).getTime() - new Date(b.date).getTime()
    //     //   })
    //     // setItemList(sortedList)
    //     setItemList([...itemList, item])
    //     // sortList()

    //     setTitle('')
    //     setDescription('')
    //     setDate(new Date())
    //     setSnackbar(true)
    //   }

    const handleAddItem = () => {
      if (title.length == 0) {
        console.log("incorrect input") // can make inputs highlighted too to show required*
        return
      }
      const item = {
        key: uuidv4(),
        title: title,
        description: description,
        date: date,
        done: false
      }
      handleAdd(item)

      setTitle('')
      setDescription('')
      setDate(new Date())
      setSnackbar(true)
    }

    return (
        <View>
          <Button
            style={[styles.button]}
            mode='contained'
            onPress={() => setAddItemModalVisible(true)}
            >
            <Text style={styles.textStyle}>Add Bucket List Item</Text>
          </Button>
          <Modal
            animationType="slide"
            transparent={false}
            visible={addItemModalVisible}
            onRequestClose={() => setAddItemModalVisible(!addItemModalVisible)}
            >
            <Button
                style={[styles.button, styles.buttonClose]}
                icon="arrow-left-thick"
                onPress={() => setAddItemModalVisible(!addItemModalVisible)}
            >
            <Text style={styles.textStyle}>{"<"}</Text>
            </Button>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Text variant="titleLarge">Add Bucket List Item </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={title => setTitle(title)}
                  value={title}
                  autoFocus={true}
                  label={'Title'}
                  />
                  <TextInput
                  style={styles.input}
                  onChangeText={description => setDescription(description)}
                  value={description}
                  label={'Description'}
                  multiline={true}
                  numberOfLines={5}
                  />
                  
                  <Text style={styles.dueDate} variant="titleMedium">Due Date</Text>
                  <DatePicker
                    value={date}
                    onChange={date => setDate(date)}
                    format={'mm-dd-yyyy'}
                    />
                  <Button 
                    mode='contained' 
                    onPress={handleAddItem}
                    style={styles.button}
                    >Submit Item</Button>
            </View>
          </View>
          <Snackbar
                visible={snackbar}
                onDismiss={() => setSnackbar(false)}
                > Added Item!
            </Snackbar>
          </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
  input: {
    width: 360,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  dueDate: {
    marginTop: 20
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "pink",
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
    elevation: 2,
    color: 'white',
    marginTop: '2vh'
  },
  buttonClose: {
    width: 40,
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
})