import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';


const firebaseConfig = {
  apiKey: "AIzaSyB_RfyI4qg9kaV7wZT6FyCsXQOCDEmPbcg",
  authDomain: "react-firebase-d7f32.firebaseapp.com",
  databaseURL: "https://react-firebase-d7f32.firebaseio.com",
  projectId: "react-firebase-d7f32",
  storageBucket: "react-firebase-d7f32.appspot.com"
};

if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}

import { Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base';

export default class App extends React.Component {

  constructor(props){
    super(props)

    this.state = ({
      email: '',
      password: ''
      })
  }

  componentDidMount(){
     firebase.auth().onAuthStateChanged((user) => {
       if(user != null)
       {
         console.log(user)
       }
       })
    }

  signUpUser = (email, password) => {
    try{
      if(this.state.password.length<6)
      {
      alert("Please enter at least 6 char")
      return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password)
    }
    catch(error){
      console.log(error.toString())
    }

  }

  loginUser = (email, password) => {
    try{
      firebase.auth().signInWithEmailAndPassword(email, password). then(function (user) {
        console.log(user)
        })

    }
    catch(error){
      console.log(error.toString())
    }
  }

  async loginWithFacebook(){
    const {type,token} = await Facebook.logInWithReadPermissionsAsync
    ("935413336844329",{permissions:['public_profile']})

    if (type == 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log(error)
        })
    }
  }

  render() {
  return (
            <Container styles={styles.container}>
             <Form>

              <Item floatingLabel style={{marginTop: 180}}>
               <Label>Email</Label>
               <Input
               autoCorret={false}
               autoCapitalize="none"
               onChangeText={(email) => this.setState({email})}
               />
              </Item>

              <Item floatingLabel>
               <Label>Password</Label>
               <Input
               secureTextEntry={true}
               autoCorret={false}
               autoCapitalize="none"
               onChangeText={(password) => this.setState({password})}
               />
              </Item>

              <Button style={{marginTop: 30}}
               full rounded success
               onPress={()=> this.loginUser(this.state.email,this.state.password)}
              >
              <Text>Login</Text>
              </Button>

              <Button style={{marginTop: 30}}
               full rounded primary
               onPress={()=> this.signUpUser(this.state.email,this.state.password)}
              >
              <Text style={{color: 'white'}}>Sign Up</Text>
              </Button>

              <Button style={{marginTop: 30}}
               full rounded primary
               onPress={()=> this.loginWithFacebook()}
              >
              <Text style={{color: 'white'}}>Login with Facebook</Text>
              </Button>

             </Form>
            </Container>
  );
 }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  }
});
