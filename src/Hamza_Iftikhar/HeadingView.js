const React = require('react');
const {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
} = require('react-native');

const window = Dimensions.get('window');
var isiPhone=Platform.OS === 'ios';

const HeadingView = (props)=>{
  const heading=props.headingWords.map((item,index)=>{
    return(
      <View key={`item-${index}`} style={[styles.subViewStyle,{borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1,borderBottomWidth:index==props.headingWords.length-1?1:0,backgroundColor:'#BFEBFF'}]} >
      <Text style={styles.textStyle}>{item}</Text>
      </View>
    )
  });


return(
  <View style={styles.viewStyle}>
  {heading}
    </View>
);

}


const styles=StyleSheet.create({
  textStyle:{
    fontSize:25,
    color:'black',
    fontFamily:'MehrNastaliqWeb',
    marginTop:10,
    marginBottom:10,
    textAlign:'center',
  },
  viewStyle:{
    // flexDirection:'row',
  },
  subViewStyle:{
    flex:1,
    // backgroundColor:'green',
    // borderWidth:1,
    // height:50,
    alignItems:'center',
    justifyContent:'center',
  },



});



module.exports=HeadingView;
