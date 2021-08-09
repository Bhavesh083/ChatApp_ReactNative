import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { db } from '../firebase';
import { FontAwesome5 } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';

const AddChatScreen = ({navigation}) => {

    const [input,setInput] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={{marginLeft:0,marginTop:4}}>
                    <TouchableOpacity style={{flexDirection:"row",alignItems:"center"}} activeOpacity={0.5}>
                        <Avatar rounded size={29} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_DBGrg9oAVHykA4Sqp6GkFiqnQ1MK_7ejcKykRExNEQ5rPaMq_NmY2qIgYsFz11IwmUA&usqp=CAU"}} />
                        <Text style={{color:"white",fontSize:20,fontWeight:"600",marginLeft:3}} >New Chat</Text>
                    </TouchableOpacity>
                </View>
            ),
            headerBackTitle:"Chats",
        });
    }, [navigation]);

    const createChat = async () =>{
        await db
        .collection('chats')
        .add({
            chatName:input
        })
        .then(()=>{
            navigation.goBack()
        })
        .catch((error)=>alert(error));
    };

    return (
        <View style={styles.container}>
            <Input placeholder="ENter a chat name" onSubmitEditing={createChat} value={input} onChangeText={(text)=>setInput(text)} leftIcon={
                <FontAwesome5 name="rocketchat" size={24} color="black" />
            } />
            <Button containerStyle={{backgroundColor:"#f2f2f2"}} type="Outline" disabled={!input} onPress={createChat} title='Create' />
        </View>
    )
}

export default AddChatScreen;

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        padding:30,
        height:"100%",
    },
})
