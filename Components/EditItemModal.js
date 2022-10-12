import React, { useState } from 'react';

import { StyleSheet, View, Pressable, Modal} from 'react-native';
import { Button, Checkbox, Text, TextInput } from 'react-native-paper';

import DatePicker from "@dietime/react-native-date-picker";

export default function EditItemModal({itemKey, itemTitle, itemDescription, itemDate, itemList, setItemList, handleFinish}) {
    const [editItemModalVisible, setEditItemModalVisible] = useState(false);

    // input fields for editing item
    const [title, setTitle] = useState(itemTitle)
    const [description, setDescription] = useState(itemDescription)
    const [date, setDate] = useState(itemDate)

    const handleSave = () => {
        // cancels edit if empty title
        if (title.length == 0) {
            console.log("incorrect input") // can make inputs highlighted too to show required*
            return
        }
        setItemList(itemList.map((item) => {
            if (item.key === itemKey) {
                item.title = title
                item.description = description
                item.date = date
            }
            return item
        }))
        setEditItemModalVisible(false)
        console.log(itemDate)
      }

    return (
        <View>
          <View key={itemKey} style={styles.todo}>
            <Pressable style={styles.textBox} onPress={() => setEditItemModalVisible(true)}>
                <Text variant="titleMedium">{itemTitle}</Text>
                <Text variant="labelMedium">{itemDate.toDateString()}</Text>
                <Text variant="bodySmall">{itemDescription}</Text>
            </Pressable>
            <Checkbox status={'unchecked'} onPress={() => handleFinish(itemKey)}/>
            </View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={editItemModalVisible}
            >
            <Button
                style={[styles.button, styles.buttonClose]}
                icon="arrow-left-thick"
                onPress={() => setEditItemModalVisible(false)}
                >
            </Button>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Text variant="titleLarge">Edit Bucket List Item </Text>
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
                    onPress={handleSave}
                    style={styles.button}
                    >Save</Button>
            </View>
          </View>
          </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
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

  input: {
    width: 360,
    margin: 12,
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
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
})