import React from 'react'
import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:'#fff',
},
appbar:{
    flex:.5,
    padding:20,
    backgroundColor:'#24A148',
    flexDirection:'row',
    justifyContent:'space-between'
   
},
bodySection:{
  flex:14,
  backgroundColor:'#fff',
  position:'relative',
  shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity:  0.4,
      shadowRadius: 3,
      elevation: 4,
},
backimage:{
    position:'absolute',
    width:'100%',
    height:'100%',
    opacity:0.15
},

bookTitle:{
    textAlign:'center',
    /* marginVertical:10, */
    fontFamily:'Jameel-Noori-Nastaleeq-Kasheeda',
    fontSize:38,
    marginTop:10,
    textShadowColor: '#e3e3e3',
     textShadowOffset: { width: -3, height: 3 },
     textShadowRadius: 1,
     color:'#24A148'
},
lineDesign:{
 width:'60%',
 height:20,
 alignSelf:'center'
},
bookDetails:(fontSize,fontfamily)=>({
    marginVertical:15,
    paddingHorizontal:30,
    fontFamily:fontfamily,
    fontSize:fontSize,
    color:'#454545',
    
    
}),
/* bardesign:{
    position:'absolute',
    left:0,
    top:10,
    height:300,
    width:16,
    backgroundColor:'rgba( 255, 180, 34, 0.65 )'
},
bardesignSec:{
    position:'absolute',
    right:0,
    bottom:10,
    height:300,
    width:16,
    backgroundColor:'rgba( 36, 161, 72, 0.65 )'
}, */

footer:{
    flex:1.5,
    flexDirection:'row',
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'space-evenly',
  
  
},
fontSizeIcon:{
    flexDirection:'row',
    marginHorizontal:5
},
menubarDesign:{
  marginTop:-40,
  marginLeft:10
},
menuItemDesign:{
   fontSize:16,
   fontFamily:'Roboto-Bold'
   
},

iconMargin:{
    marginHorizontal:10,
},


})
    

export default Styles;
