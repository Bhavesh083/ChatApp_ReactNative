import React, { useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text} from 'react-native-elements';
import { auth } from '../firebase';
import { TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Platform } from 'react-native';

const RegisterScreen = ({ navigation }) => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [imageUrl,setImageUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={{marginLeft:0,marginTop:4}}>
                    <TouchableOpacity style={{flexDirection:"row",alignItems:"center"}} activeOpacity={0.5}>
                        <Avatar rounded size={29} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_DBGrg9oAVHykA4Sqp6GkFiqnQ1MK_7ejcKykRExNEQ5rPaMq_NmY2qIgYsFz11IwmUA&usqp=CAU"}} />
                        <Text style={{color:"white",fontSize:20,fontWeight:"600",marginLeft:3}} >Register</Text>
                    </TouchableOpacity>
                </View>
            ),
            headerBackTitle : 'Back to Login', 
            headerTitleAlign: "center",  
        })       
    }, [navigation]);

    const register = () =>{
        auth.createUserWithEmailAndPassword(email,password)
        .then((authUser)=>{
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU1QFXyc9dS6HeQnU8J1WFmbnseruDoSs_vg&usqp=CAU"
            });
        })
        .catch(error=>alert(error.message));
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios"? "padding":"height"} style={styles.container}>
            <StatusBar style="light" />

            <Text h4 style={{marginBottom:50,color:"#999",fontWeight:'bold'}} >
                Create your new Account!
            </Text>
            
            <View style={styles.inputContainer} >
                <Input leftIcon={ <Entypo name="user" size={20} color="white" /> } style={styles.inp} placeholder='Full Name' autoFocus type='text' value={name} onChangeText={(text)=>setName(text)} />
                <Input leftIcon={ <MaterialIcons name="email" size={24} color="white" /> } style={styles.inp} placeholder='Email' type='email' value={email} onChangeText={(text)=>setEmail(text)} />
                <Input leftIcon={ <FontAwesome5 name="key" size={24} color="white" /> } style={styles.inp} placeholder='Password' secureTextEntry  type='password' value={password} onChangeText={(text)=>setPassword(text)} />
                <Input leftIcon={ <Entypo name="link" size={24} color="white" /> } style={styles.inp} placeholder='Profile pic URL (optional)'  type='text' value={imageUrl} onChangeText={(text)=>setImageUrl(text)} onSubmitEditing={register} />
            </View>

            <Button containerStyle={styles.button} buttonStyle={{backgroundColor:"#4da6ff"}}  raised onPress={register} title="Register" />

            <View style={{height:100}} />

        </KeyboardAvoidingView>
    )
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container:{
        flex : 1,
        alignItems : "center", 
        justifyContent : "center",
        padding : 10,
        backgroundColor:"black",
    },
    inputContainer:{
        width:"100%",
    },
    button:{
        width:200,
        marginTop:25,
    },
    inp:{
        color:"#fff", 
    },
});
