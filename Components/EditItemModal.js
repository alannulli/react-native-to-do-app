import React, { useState } from 'react';

import { StyleSheet, View, Pressable, Modal, ImageBackground} from 'react-native';
import { Button, Checkbox, Text, TextInput } from 'react-native-paper';

import DatePicker from "@dietime/react-native-date-picker";

export default function EditItemModal({item, handleFinish, handleEdit}) {
    const [editItemModalVisible, setEditItemModalVisible] = useState(false);

    // input fields for editing item
    const [title, setTitle] = useState(item.title)
    const [description, setDescription] = useState(item.description)
    const [date, setDate] = useState(item.date)

    const handleSave = () => {
        // cancels edit if empty title
        if (title.length == 0) {
            console.log("incorrect input") // can make inputs highlighted too to show required*
            return
        }

        const newItem = {
          key: item.key,
          title: title,
          description: description,
          date: date,
          done: false
        }
        handleEdit(newItem)
        
        setEditItemModalVisible(false)
      }

    return (
        <View>
          <View key={item.key} style={styles.todo}>
            <Pressable style={styles.textBox} onPress={() => setEditItemModalVisible(true)}>
                <Text variant="titleMedium">{item.title}</Text>
                <Text variant="labelMedium">Due: {item.date.toDateString()}</Text>
                <Text variant="bodySmall">{item.description}</Text>
            </Pressable>
            <Checkbox status={'unchecked'} onPress={() => handleFinish(item.key)}/>
            </View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={editItemModalVisible}
            >
            <ImageBackground source={require("../assets/boba_strawberry.png")} resizeMode="repeat">
            <Button
                style={[styles.buttonClose]}
                icon="arrow-left-thick"
                onPress={() => setEditItemModalVisible(false)}
                >
            </Button>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Text variant="titleLarge"><b>Edit Bucket List Item</b></Text>
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

                  <Text style={styles.dueDate} variant="titleMedium"><b>Due Date</b></Text>
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
          </ImageBackground>
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
    marginTop: '2vh',
    backgroundColor: '#00c04b'
  },
  buttonClose: {
    width: 40,
    marginTop: '2vh',
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