import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity  } from 'react-native';
import { Avatar } from 'react-native-elements';
import CustomListItem from "../Components/CustomListItem" ;
import { auth, db } from '../firebase';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { Button, Input, Image } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = ({navigation}) => {

    const [chats,setChats] = useState([]);

    const signOutUser = () =>{
        auth.signOut().then(()=>{
          navigation.replace("Login");
        });
    };

    useEffect(() => {
        const unsubscribe = db
        .collection('chats')
        .onSnapshot((snapshot) => 
            setChats(
                snapshot.docs.map((doc)=>({
                    id:doc.id,
                    data:doc.data(),
                }))
            )
        );
        return unsubscribe;
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title : " ",
            headerStyle: {backgroundColor:'#cc7a00'},
            headerTitleStyle: {color:"black"},
            headerTintColor:"black",
            headerLeft: () => (
                <View style={{ flexDirection:"row", justifyContent:"space-between", marginLeft:20,alignItems:"center" }}>
                    
                    <TouchableOpacity  activeOpacity={0.5}  >
                        <Avatar rounded source={{ uri: `${auth?.currentUser?.photoURL}` }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:15}} activeOpacity={0.5}>
                        <FontAwesome5 name="video-slash" size={23} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:15}} onPress={()=>navigation.navigate("AddChat")} activeOpacity={0.5}>
                        <Entypo name="add-user" size={24} color="black" />
                    </TouchableOpacity>

                </View>
                
            ),
            headerRight: () => (
                <View style={{marginRight:20,alignItems:"center"}}>
                    <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}  >
                        <MaterialCommunityIcons name="logout" size={27} color="black" />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    const enterChat = (id,chatName) =>{
        navigation.navigate("Chat",{
            id,
            chatName,
        });
    };

    return ( 
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({id,data:{chatName}}) => (
                    <CustomListItem enterChat={enterChat} key={id} id={id} chatName={chatName} />
                ))}
                </ScrollView> 
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        height:"100%",
        backgroundColor:"#fff",
    }, 
})
