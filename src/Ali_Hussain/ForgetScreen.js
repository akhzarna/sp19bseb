import React from 'react';
import { 
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
 } from 'react-native';
 import * as Animatable from 'react-native-animatable';
 import { TextInput } from 'react-native-paper';
 import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
 import LinearGradient from 'react-native-linear-gradient';
const ForgetScreen=({navigation})=> {
    return(
        <View style={styles.container}>
                   <View>
            <TouchableOpacity onPress={()=>{navigation.navigate("SignIn")}}>
            <MaterialIcons 
                        name="chevron-left"
                        color="#fff"
                        size={45}
                    />
            </TouchableOpacity>
          </View>
          < Animatable.View
            style={[styles.footer, {
              backgroundColor:'#fff'
              
          }]}
          animation="fadeInUpBig"
         
          >
            <Image source={require('./asets/lock.png')}
                   style={styles.img}
             />
          <Text style={styles.title}>Forget Your password?</Text>
          <Text style={styles.ins}>Confirm Your email and we'll send the instruction.</Text>
              <TextInput
                label="Email*"
                style={styles.input}
                secureTextEntry
                left={<TextInput.Icon name="email" color='#24A148' />}
                mode='outlined'
                activeOutlineColor='rgba(2, 142, 70, 0.6)'
                outlineColor='#01ab9d'
                value={null}
              />
            <View style={styles.button}>
            <TouchableOpacity 
            onPress={()=>{navigation.navigate("PasswordScreen")}} >
                <LinearGradient
                    colors={['#BEE086', '#24A148']}
                    style={styles.signUp}
                >
                    <Text style={styles.textSign}>Reset password</Text>
                    <MaterialIcons 
                        name="arrow-forward"
                        color="#fff"
                      
                        size={28}
                    />
                </LinearGradient>
            </TouchableOpacity>
           
            </View>
          </Animatable.View>

        </View>
        
    )
}
export default ForgetScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
      container: {
    flex: 1, 
    backgroundColor: '#24A148',
    justifyContent:'center'
  },

  footer: {
    
      backgroundColor: '#fff',
      borderTopLeftRadius: 50,
      borderBottomRightRadius: 50,
      height:'90%'
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      marginTop:0,
      paddingLeft:40,
      fontWeight: 'bold'
  },
  ins: {
    color: '#05375a',
    fontSize: 18,
    paddingLeft:22,
    margin:20,
},

  button: {
      alignItems: 'flex-end',
      marginTop: 50,
      paddingRight:20,
      

  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:18,
    
},
  signUp: {
      width: 200,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
      paddingRight:8,
      flexDirection: 'row'
  },
  img: {
    height:100,
    width:100,
    margin:40,
    alignSelf:'center',

},
  input: {
    margin:10,
    fontSize: 16,
    backgroundColor:'#fff',
    marginHorizontal:30
  },
})