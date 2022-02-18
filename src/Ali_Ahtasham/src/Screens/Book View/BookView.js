import React from 'react'
import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import Styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Menu } from 'react-native-paper';


const fontfamilies = ['UrduTypesetting','Jameel-Noori-Nastaleeq','UrduNaskhAsiatype','noorehuda',]
const data =[{
  key:1,
chapter:'حرف آغاز',
details:'اردو ٹیکسٹ آرکائیو اردو یونیکوڈ ڈیٹا کے مختلف آن لائن ذرائع سے متن کا مجموعہ ہے۔ اس کا مقصد اردو کارپس بنانے کی طرف پہلا قدم کے طور پر خام متن کو جمع کرنا تھا۔ چونکہ اردو کے لیے ابھی تک کوئی قابل عمل گرائمیکل ٹیگر دستیاب نہیں ہے، اس لیے اس ڈیٹا کو صرف الفاظ کی فہرست بنانے یا کمپیوٹیشنل لسانی مقاصد کے لیے استعمال کیا جا سکتا ہے۔ ڈیٹا کو اچھی طرح سے نمونہ نہیں بنایا گیا ہے کیونکہ ہمارے پاس ڈیٹا اکٹھا کرنے میں کم سے کم انتخاب تھا'},
{
  key:2,
chapter:'حرف آغاز',
details:'اردو ٹیکسٹ آرکائیو اردو یونیکوڈ ڈیٹا کے مختلف آن لائن ذرائع سے متن کا مجموعہ ہے۔ اس کا مقصد اردو کارپس بنانے کی طرف پہلا قدم کے طور پر خام متن کو جمع کرنا تھا۔ چونکہ اردو کے لیے ابھی تک کوئی قابل عمل گرائمیکل ٹیگر دستیاب نہیں ہے، اس لیے اس ڈیٹا کو صرف الفاظ کی فہرست بنانے یا کمپیوٹیشنل لسانی مقاصد کے لیے استعمال کیا جا سکتا ہے۔ ڈیٹا کو اچھی طرح سے نمونہ نہیں بنایا گیا ہے کیونکہ ہمارے پاس ڈیٹا اکٹھا کرنے میں کم سے کم انتخاب تھا'},

]

const {width , height} = Dimensions.get('screen')

const BookView = ({navigation}) => {

    const [fontSize , setSize] = React.useState(26);
    const [fontfamily , changefontFamily] = React.useState(fontfamilies[0]);
    const [visible, setVisible] = React.useState(false);
    const [index, setIndex] = React.useState(0);

    const reff = React.useRef();

    React.useEffect(()=>{
      reff.current?.scrollToIndex({
        index ,
        animated:true
      });
    }, [index]);
    
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

    const ClickIncremental = () =>{
        setSize(fontSize+3)};

        const ClickDecremental = () =>{
            setSize(fontSize-3)};


    return (
        <View  style = {Styles.container}>
            <View style = { Styles.appbar}>
            <TouchableOpacity onPress={()=>{navigation.navigate("BookDetail")}}>
      <Icon name="chevron-left" size={22} color="#fafafa" />
      </TouchableOpacity>
            </View>
            <View style={Styles.bodySection}>
            <ImageBackground source={require("../../../images/backgg2.png")} style={Styles.backimage} />
           
             <FlatList
             data={data}
             ref={reff}
             initialScrollIndex={index}
             keyExtractor={(key)=>key.key}
             pagingEnabled
             horizontal
             showsHorizontalScrollIndicator={false}
             renderItem={({item})=>(

               <ScrollView showsVerticalScrollIndicator={false}>

               <View style={{flex:1, width}}>
                 <Text style ={Styles.bookTitle}>
                   {item.chapter}
              </Text>
              <Image
            style={Styles.lineDesign}
          source={require("../../../images/linesChng.png")}
        />
              <Text style ={Styles.bookDetails(fontSize ,fontfamily )} selectable={true} selectionColor='orange'>
          {item.details}
 </Text>

               </View>
                </ScrollView>
             )}/>
              

{/*  <View
            style={Styles.bardesign}
         
        />
        <View
            style={Styles.bardesignSec} 
        /> */}
       
            </View>
    <View style ={Styles.footer}>
    <Icon name="caret-left" size={35} color="#454545" onPress={()=>
   {
     if(index===0){
       return;
     }
    setIndex(index - 1);
   
   }}/>
        <TouchableOpacity style = {Styles.fontSizeIcon} onPress={ClickIncremental} >
    <Icon name="font" size={28} color="#454545" />
    <Icon name="plus" size={15} color="#454545" />
    </TouchableOpacity>
    <TouchableOpacity style = {Styles.fontSizeIcon} onPress={ClickDecremental}>
    <Icon name="font" size={24} color="#454545" />
    <Icon name="minus" size={12} color="#454545" />
    </TouchableOpacity>
   
   
    <Menu
          visible={visible}
          onDismiss={closeMenu}
          style={Styles.menubarDesign}
          anchor={<MaterialCommunityIcons name="format-font" size={30} color="#454545" style={Styles.iconMargin} onPress={openMenu}/>}>
          <Menu.Item onPress={() => {changefontFamily(fontfamilies[0])}} title="Urdu Type Font" titleStyle={Styles.menuItemDesign} />
          <Menu.Item onPress={() => {changefontFamily(fontfamilies[1])}} title="Jameel Noori Nastaleeq" titleStyle={Styles.menuItemDesign}/>
          <Menu.Item onPress={() => {changefontFamily(fontfamilies[2])}} title="Urdu NaskhAsia" titleStyle={Styles.menuItemDesign}/>
          <Menu.Item onPress={() => {changefontFamily(fontfamilies[3])}} title="Noor-e-Huda" titleStyle={Styles.menuItemDesign}/>
    </Menu>
    
    <MaterialCommunityIcons name="invert-colors" size={30} color="#454545" style={Styles.iconMargin}/>
    <Icon name="caret-right" size={35} color="#454545" onPress={()=>
   {
    if(index===data.length-1){
      return;
    }
   setIndex (index+1);
  
  }}/>
     </View>
        </View>
    )
}

export default BookView;