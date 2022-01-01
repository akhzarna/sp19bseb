
import React from 'react'
import { View, ScrollView, Text, BackHandler, Alert, StyleSheet, Image, Pressable, StatusBar } from 'react-native';
import Header from '../../Components/Header';
import Styles from './Styles';
import Icon from 'react-native-vector-icons/Fontisto';

export default function MainScreen({navigation}) {
    return (

                <View style ={Styles.Container}>

               <Header navigation={navigation}/>

               <View style = {Styles.UpperBody}>
                   <View style = {Styles.sectionright}>
                   <Image
                    style={Styles.founderimg}
                    source={require('../../Assets/Images/hakeem.png')}
                    />
                    <Text style = {Styles.imgdetails}>حکیم محمد عبداللہ</Text>
                    <Text style = {Styles.imgdetails}>(1974-1904)</Text>
                   </View>
                   <View style = {Styles.sectionleft}>
                       <Text style = {Styles.aboutContent}>حکیم محمد عبداللہؒ کے صاحبزادے حکیم عبدالوحید سلیمانی   ؒنے 1968ء میں پنجاب یونیورسٹی ، لاہور سے فارمیسی اور اسلامیات کی تعلیم کے حصول کے بعد جہانیاں سے عملی زندگی کا آغاز کیا اور کتب و ادویہ کی فروخت اور ترسیل کے لیے ادارہ سلیمانی کی بنیاد رکھی۔</Text>
                       <Pressable style = {Styles.moreBtn}>
                           <Text style = {Styles.Btntxt}>View More .. </Text>
                       </Pressable>
                   </View>
               </View>
             {/*  <View style ={Styles.midBody}>
               <Image
                    style={Styles. designContent}
                    source={require('../../Assets/Images/leaf.png')}
                    />
                   <Text style ={Styles.midContent}>ہماری روایت ۔ ہمارا عزم   فروغ صحت ۔ فروغ علم</Text>
                 <Image
                    style={Styles. designContent}
                    source={require('../../Assets/Images/leaf.png')}
                    />

    </View> */}
               <View style ={Styles.Grids}>
                   <View style ={Styles.GridOne}>
                   <Image
                    style={Styles.Gridimg}
                    source={require('../../Assets/Icons/ExpandMenu_9.png')}
                    />
                    <Text style = {Styles.GridNam}>ادویات</Text>
                   </View>
                   <View style ={Styles.GridOne}>
                   <Image
                    style={Styles.Gridimg}
                    source={require('../../Assets/Icons/ExpandMenu_10.png')}
                    />
                    <Text style = {Styles.GridNam}>مطب</Text>
                   </View>
                   <View style ={Styles.GridOne}>
                   <Image
                    style={Styles.Gridimg}
                    source={require('../../Assets/Icons/ExpandMenu_7.png')}
                    />
                    <Text style = {Styles.GridNam}>کتب</Text>
                   </View>
               </View>

              <View style = {Styles.footer}>
                  <View style = {Styles.footerTxtDesign}>

                  <Text style = {Styles.footerTxt}>
                  ہماری روایت ۔ ہمارا عزم
                   </Text>
                   </View>

                  <Text style = {Styles.footerTxtSecond}>
                  فروغ صحت ۔ فروغ علم
                     </Text>


              </View>

                </View>



    );
}
