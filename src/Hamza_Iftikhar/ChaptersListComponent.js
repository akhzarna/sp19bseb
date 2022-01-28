
  import React, { Component } from 'react';
  import {
    AppRegistry,
    StyleSheet,
    Text,
    Alert,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    Platform,
    SectionList,
    ImageBackground,
    Dimensions,
    TextInput,
  } from 'react-native';

  var Header=require('./Header');
  var arrow_left=require('./Icons/arrow_left.png');
  import HTMLView from 'react-native-htmlview';
  import SearchHeader from './SearchHeader';

  var isiPhone=Platform.OS === 'ios';
  var backArrow=require('./Icons/backArrow_2.png')
  var headerImage=require('./Icons/headerstraight.png');
  var searchIcon =  require('./Icons/search_icon.png');

  const window = Dimensions.get('window');

  export default class ChaptersListComponent extends Component{

    constructor(props){
      super(props);
      console.log(this.props.route.params.finalArray);

        //     var finalArray=[];
        //     for (var x = 0; x < this.props.navigation.state.params.finalArray.length; x++) {
        //     var arrayList=[];
        //     for (var i = 0; i < this.props.navigation.state.params.finalArray[x].searchedArray.length; i++) {
        //       var paragraph=''+this.props.navigation.state.params.finalArray[x].searchedArray[i].data.data;
        //       var searchWord=this.props.navigation.state.params.finalArray[x].word;
        //       var index=paragraph.indexOf(searchWord);
        //       var data='';
        //       var firstIndex=-1;
        //       var secondIndex=-1;
        //       if (index-15>0) {
        //         var tempIndex=index-15;
        //         firstIndex=paragraph.indexOf(' ',tempIndex);
        //       }else{
        //         firstIndex=0;
        //       }
        //       secondIndex=paragraph.indexOf(' ',index+100);
        //       if (secondIndex==-1) {
        //         secondIndex==paragraph.length;
        //       }
        //       data=paragraph.slice(firstIndex,secondIndex);
        //       data=data.replace(/\r|\n/g,' ');
        //       data=data.replace(/#/g,' ');
        //       // data=data.replace(searchWord,'<b>'+searchWord+'</b>');
        //       // data='<p>'+data+'</p>';
        //       var frequency=this.findFrequencyOfSearchWord(paragraph)
        //       var object={data:data,key:i,frequency:frequency};
        //       arrayList.push(object)
        //       arrayList.sort(function(a,b){
        //         return parseInt(b.frequency)-parseInt(a.frequency);
        //       })
        //
        //   }
        //
        //       finalArray.push(arrayList);
        //
        // }
        this.state={
          mainArray:this.props.route.params.bookdetail.chapters,
          searchArray:this.props.route.params.bookdetail.chapters,
          dataArray:[],
        }
  }

  componentDidMount(){
    // Alert.alert('Chapters');
    console.log('Chapters' + this.props.route.params.bookdetail.chapters[0].title);

//     var tempArray=[];
//     var flag = 0;
//     var key = -1;
//     while (flag < this.props.navigation.state.params.finalArray.length) {
//       var chapter_name = this.props.navigation.state.params.finalArray[flag].chapter_name;
//       var dataArray = [];
//       for (var j = flag; j < this.props.navigation.state.params.finalArray.length; j++) {
//         if (chapter_name == this.props.navigation.state.params.finalArray[j].chapter_name) {
//           dataArray.push(this.props.navigation.state.params.finalArray[j]);
//           flag = flag + 1;
//         }else{
//           // console.log('What is Flag = ',flag);
//           break;
//         }
//     }
//
//     // New One
//     var tempArrayNew=[];
//     var flagNew = 0;
//     var keyNew = -1;
//     while (flagNew < dataArray.length) {
//       var innerKeyValue = -1
//       var disease_name = dataArray[flagNew].disease_name;
//       var dataArrayNew = [];
//       for (var j = flagNew; j < dataArray.length; j++) {
//         if (disease_name == dataArray[j].disease_name) {
//           innerKeyValue++;
//           dataArray[j].key = innerKeyValue;
//           dataArrayNew.push(dataArray[j]);
//           flagNew = flagNew + 1;
//         }else{
//           // console.log('What is Flag = ',flagNew);
//           break;
//         }
//     }
//
//     // console.log('What is data = ',dataArray);
//
//     keyNew = keyNew + 1;
//     var dataNew=dataArrayNew;
//     var titleNew=disease_name;
//
//     var objectNew={data:dataNew,key:keyNew,title:titleNew};
//     tempArrayNew.push(objectNew);
//
//   }
//
//     // console.log('tempArrayNew = ',tempArrayNew);
//     // End New One
//
//     key = key + 1;
//     var data=tempArrayNew;
//     var title=chapter_name;
//
//     var object={data:data,key:key,title:title};
//     tempArray.push(object);
// }
//
//     console.log('Final tempArrayNew is = ',tempArray);
//
//     this.setState({
//       mainArray:tempArray,
//       dataArray:tempArray,
//     });
}

  // findFrequencyOfSearchWord(paragraph){
  //     var searchWord=this.props.navigation.state.params.finalArray[0].word;
  //     // // console.log('Search Result For Frequency is = ' + searchWord);
  //     var freqCounter = 0;
  //     var headingEndIndex = paragraph.indexOf('\r',1);
  //     // // console.log('Heading End Index is = ' + headingEndIndex);
  //     // // console.log('Paragraph Length is = ' + paragraph.length);
  //     for (var j = 0; j <paragraph.length; j++) {
  //             var index=paragraph.indexOf(searchWord,j);
  //             if (index == -1) {
  //               break;
  //             }
  //             else{
  //               freqCounter++;
  //             }
  //             if (index<headingEndIndex) {
  //               freqCounter=1000;
  //             }
  //             j=index+1;
  //     }
  //     return freqCounter;
  // }

  //  componentDidMount(){     4 testing
  //    if(this.state.mainArray.length){
  //    //  Alert.alert("calling");
  //   this.rowSelected();
  //  }
  // }

  // rowSelected(){

  // // // if (item.key == -1) {
  // // //   return ;
  // // // }
  // //   var tempArray=[];    4 testing
  // //   var count=0;
  // //  // Alert.alert(this.state.mainArray[1].title,this.state.mainArray[1].data[0].data);
  // //   // Alert.alert('0'+this.state.mainArray.length);
  // //      //for(var i=0; i<this.state.mainArray.length; i++){
  // //       for(var i=0; i<15; i++){
  // //     var title= this.state.mainArray[i].title;

  // //     for(var j=0; j<1; j++){
  // //     var data= this.state.mainArray[i].data[j].data;

  // //     count = count+1;
  // //     var obj={data:data,title:title,key:count}
  // //     tempArray.push(obj);
  // //   }
  // // }
  // //    this.setState({showData:tempArray});
  // //    // this.settingOut();
  // }

  rowSelected(item,section){
    if (item.key == -1) {
      return ;
    }
    console.log('section.key =',section.key);
    console.log('item.key =',item.key);
    console.log('selectedRow ===',this.state.mainArray[section.key].title);
    console.log('Final Data is ===',this.state.mainArray[section.key].data[item.key]);

    var finalArrayClone = [];
    finalArrayClone.push(this.state.mainArray[section.key].data[item.key]);
    if (this.state.mainArray[section.key].data[item.key].data.length>1) {
      this.props.navigation.navigate('ChaptersListDetailComponent',{
        finalArray:finalArrayClone,
        title:this.state.mainArray[section.key].title,
      });
    }else{
      this.props.navigation.navigate('ReadingComponentFromBooks',{
        sectionArray:this.state.mainArray[section.key].data[item.key].data,
        selectedRow:0,
        title:this.state.mainArray[section.key].data[item.key].title,
      });
    }
  }

  actButtonSearch(){
    Alert.alert('actButtonSearch');
  }

  actSearch(text){
    this.state.showSearchField = true;
    this.setState({
      showSearchField:this.state.showSearchField,
    })

    var searchWord=text.trim();
    if (searchWord) {
      // Alert.alert('text is = ',searchWord);
      var tempArray=[];
      for (var x = 0; x < this.state.mainArray.length; x++) {
        var paragraph=''+this.state.mainArray[x].title;
        var index=paragraph.indexOf(searchWord);
        if (index !=-1){
          console.log('Testing Log');
          tempArray.push(this.state.mainArray[x]);
        }else{
          // for (var y = 0; y < this.state.mainArray[x].data.length; y++) {
          //   var paragraph=''+this.state.mainArray[x].data[y].title;
          //   var index=paragraph.indexOf(searchWord);
          //   // console.log('x is = ', x);
          //   // console.log('index is = ', index);
          //   if (index !=-1){
          //     tempArray.push(this.state.mainArray[x]);
          //   }
          // }
        }
      }
    }else{
      tempArray=this.state.mainArray;
    }

console.log('After Searching Array temp Array is =',tempArray);

this.setState({
searchArray:tempArray,
})
}

 actionTextBlur(){
  // Alert.alert('false');
  // if (this.state.textSearch == '') {
  //   this.setState({
  //     showSearchField:false,
  //   })
  // }
}

  // componentWillUnmount(){
  //   console.warn('componentWillUnmount()');
  // }

    render(){
      return(
        <View style={styles.outerContainer}>
          <View style={{marginTop:5,marginBottom:5,backgroundColor:'#24A148',flexDirection:'row'}}>
              <TouchableOpacity onPress={()=>this.actButtonSearch()} style={{marginLeft:10,marginRight:10,marginTop:5,marginBottom:5,}}>
                  <Image style={{width:24,height:24}} source={searchIcon}/>
                </TouchableOpacity>
                <View style={{flex:1,marginLeft:10,marginRight:0,}}>
                  <TextInput
                    autoFocus={false}
                    selectionColor='white'
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.actSearch(text)}
                    onBlur={()=>this.actionTextBlur()}
                    placeholder="تلاش کریں۔۔۔"
                    style={{
                      borderWidth:1,
                      borderColor:'grey',
                      height:35,
                      marginRight:0,
                      textAlign:'right',
                      paddingRight:15,
                      paddingLeft:10,
                      borderRadius:200,
                      color:'white'
                    }}
                  />
                </View>

            </View>

      <SectionList
        renderItem={({item,section}) => <TouchableOpacity onPress={()=>this.rowSelected(item,section)}>
                      <View style={styles.textView}>
                      <View style={{flex:1}}>
                      <Image source={arrow_left} style={styles.iconDimention}/>
                      </View>
                      <View style={{flex:8}}>
                      <Text numberOfLines={1} style={styles.textStyle}> {item.title}</Text>
                      </View>
                      </View>
                      <View style={styles.lineView}/>
                      </TouchableOpacity>}
        renderSectionHeader={({section}) =>
        <View style={{height:40,backgroundColor:'#24A148',justifyContent:'center'}}>
        <Text style={{color:'white',textAlign:'right',
        paddingLeft:15,paddingRight:15,
        fontSize:20,
        fontFamily:'MehrNastaliqWeb',
          }}>
          {section.title}
          </Text>
        </View>
        }
        sections={this.state.showSearchField?this.state.searchArray:this.state.mainArray}
        />
        </View>

      );
    }
  }

  const styles=StyleSheet.create({
    outerContainer:{
      flex:1,
      backgroundColor:'#F7FAFB',
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    textView:{
      height:80,
      alignItems:'center',
      justifyContent:'flex-end',
      marginLeft:15,
      marginRight:15,
      flexDirection:'row',
    },
    lineView:{
      height:1,
      marginRight:15,
      marginLeft:15,
      backgroundColor:'#E5E5E5',
    },
    textStyle:{
      textAlign:'right',
      color:'#000000',
      fontFamily:'MehrNastaliqWeb',
      fontSize:17,
    },
    iconDimention:{
      width:12,
      height:20,
    }
  })

  const htmlstyles = StyleSheet.create({
    a: {
      fontWeight: '300',
      color: '#FF3366', // make links coloured pink
    },
    b:{
      fontWeight:'bold',
      color:'red',
    }
  });

  // module.exports = ChaptersListComponent;


  // <Header title={this.props.route.params.title} showMenu={false} navigator={this.props.navigator} navigation={this.props.navigation}/>
