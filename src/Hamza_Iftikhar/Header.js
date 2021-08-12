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
  TextInput,
  ImageBackground,
} = require('react-native');

var menuIcon=require('./Icons/menu_icon.png');
var backArrow=require('./Icons/backArrow_2.png')
var headerImage=require('./Icons/headerstraight.png');
var searchIcon =  require('./Icons/search_icon.png');

var isiPhone=Platform.OS === 'ios';
const window = Dimensions.get('window');

const Header = (props)=>{

  function actMenuClick() {
   if (props.showMenu) {
    //  Alert.alert('Nothing to Pop');
     props.navigation.navigate('SideMenu');

    //  props.navigator.toggleDrawer({
    //     side: 'right',
    //     animated: true
    //   });

   }else{

     props.navigation.pop();

    //  Alert.alert('Else Part');

    //  if (props.callBackFunction!= null) {
    //    props.callBackFunction("data passed");
    //  }
    //  props.navigator.pop();

   }
 }

	return (
    <ImageBackground resizeMode={'stretch'} source={headerImage} style={{height:60,width:window.width,backgroundColor:'transparent'}}>
       <View style={[styles.container,{backgroundColor:props.isHome?'transparent':'transparent'}]}>

        {/* In Header I have divided HeaderView 33% Each by dividing it into Left, Center and Right Views*/}
        <View style={styles.leftView}>
        </View>

        <View style={styles.centerView}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.titleStyle}> {props.title}
          </Text>
        </View>

        <View style={styles.rightView}>
        <TouchableOpacity style={styles.buttonDimension}
          onPress={actMenuClick}
          >
          {
          props.showMenu? (<Image resizeMode={'contain'} style={styles.iconMenuDimension} source={menuIcon}/>
          ):(<Image style={styles.iconStyle} source={backArrow}/>)
          }
        </TouchableOpacity>
        </View>

       </View>
    </ImageBackground>
		);
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftView:{
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
  },
  centerView:{
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
  },
  titleStyle:{
    fontFamily:'MehrNastaliqWeb',
    color:'white',
    fontSize:24,
  },
  rightView:{
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
  },
  buttonDimension:{
    // flex: 1,
    marginRight:0,
    marginLeft:0,
    width:75,
    height:50,
    alignItems:'flex-end',
    justifyContent:'center',
    // backgroundColor:'red',
  },
  iconStyle:{
    // backgroundColor:'red',
    // flex:5,
    width:30,
    height:22,
  },
  iconMenuDimension:{
    width:35,
    height:23,
    marginRight:15,
  },
  buttonNotificationDimention:{
    alignItems:'center',
    justifyContent:'center',
    marginRight:10,
    width:40,
    height:40,
  },
  iconNotifyDimension:{
    width:30,
    height:25,
    marginRight:15,
    resizeMode: 'contain',
  },
});
module.exports=Header;
