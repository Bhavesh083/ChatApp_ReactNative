import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { db } from '../firebase';

const CustomListItem = ({id,chatName,enterChat}) => {

    const[chatMessages,setChatMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = db
        .collection('chats')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp','asc')
        .onSnapshot((snapshot) =>
          setChatMessages(snapshot.docs.map((doc)=>doc.data()))
        );
        return unsubscribe; 
    });

    return (
        <ListItem onPress={()=>enterChat(id,chatName)} style={{borderBottomWidth:1,borderBottomColor:"black"}} key={id} >
            <Avatar rounded source={{
                uri: chatMessages?.[0]?.photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtygJHG2ryzwK3bkAjNhU66z2P6Kt2nNN5UA&usqp=CAU"}} />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:"800"}}>
                    {chatName} 
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" >
                    {chatMessages?.[chatMessages.length-1]?.displayName} : {chatMessages?.[chatMessages.length-1]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
}

export default CustomListItem;

const styles = StyleSheet.create({})
