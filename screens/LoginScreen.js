import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, Input, Image } from 'react-native-elements';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { auth } from '../firebase';
import { Platform } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    
    useLayoutEffect(() => { 
        navigation.setOptions({
            headerTitleStyle:{display:"none"},
            headerLeft: () => (
                <View style={{marginLeft:20}}>
                    <TouchableOpacity style={{flexDirection:"row",alignItems:"center"}} activeOpacity={0.5}>
                        <Avatar rounded size={29} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_DBGrg9oAVHykA4Sqp6GkFiqnQ1MK_7ejcKykRExNEQ5rPaMq_NmY2qIgYsFz11IwmUA&usqp=CAU"}} />
                        <Text style={{color:"white",fontSize:20,fontWeight:"600",marginLeft:3}} >Chatter</Text>
                    </TouchableOpacity>
                </View>
            )})
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            console.log(authUser);
            if(authUser){
                navigation.replace("Home");
            }
        });
        return unsubscribe;
    }, []);

    const signIn = () =>{
        auth.signInWithEmailAndPassword(email,password)
        .catch((error)=>alert(error));
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios"? "padding":"height"} style={styles.container}>
            <StatusBar style="light" />
            <Image 
              source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_DBGrg9oAVHykA4Sqp6GkFiqnQ1MK_7ejcKykRExNEQ5rPaMq_NmY2qIgYsFz11IwmUA&usqp=CAU"}}
              style={{width:100,height:100,marginBottom: 40}}
            />
            <View style={styles.inputContainer}>
                <Input leftIcon={ <MaterialIcons name="email" size={22} color="white" style={{marginRight:5}} /> }  style={styles.inp} placeholder="Email" autoFocus type="email" value={email} onChangeText={(text)=>setEmail(text)} />
                <Input leftIcon={ <FontAwesome5 name="key" size={22} color="white" style={{marginRight:5}} /> }  style={styles.inp} placeholder="Password" secureTextEntry type="password" value={password} onChangeText={(text)=>setPassword(text)} onSubmitEditing={signIn} />
            </View>
            <Button title="Login"  containerStyle={styles.button} titleStyle={{color:"#fff"}} type="Outline"  onPress={signIn} />
            <Button title="Register" containerStyle={styles.button} buttonStyle={{backgroundColor:"#cc7a00"}}  onPress={()=>navigation.navigate('Register')} />
            <View style={{height:150}} />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container:{
        flex : 1,
        alignItems : "center", 
        justifyContent : "center",
        padding : 10,
        backgroundColor:"black",
    },
    inputContainer :{
        width : "100%",
    },
    button:{
        width : 200,
        marginTop:10,
        backgroundColor:"#333",
    },
    inp:{
        color:"white",
    },
});

