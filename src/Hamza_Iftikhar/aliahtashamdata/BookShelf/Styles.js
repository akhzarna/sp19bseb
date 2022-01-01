import {StyleSheet} from 'react-native';


const Styles = StyleSheet.create({
    Container:{
        backgroundColor:'#fff',
    flex:1,
    },
    UpperBody:{
        flexDirection:'row-reverse',
        backgroundColor:'#fff',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        shadowColor: '#000',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 10,
        elevation: 5 
    },
    sectionright:{
        margin:15,
        borderWidth:.8,
        borderRadius:20,
        borderColor:'#ffb422'
    },
    founderimg:{
        height:130,
        width:120,
        borderRadius:20,
        borderColor:'#fff',
       borderWidth:7,
    
    },

    imgdetails:{
        textAlign:'center',
        color:'#a5a5a5',
        fontFamily:'Jameel-Noori-Nastaleeq-Kasheeda',
    },
    sectionleft:{
        width:'60%',
       marginVertical:15,
       paddingTop:10,  
       paddingLeft:10,
    },
    aboutContent:{
        textAlign:'auto',
        color:'#a5a5a5',
        fontFamily:'Jameel-Noori-Nastaleeq-Kasheeda',
        fontSize:14,
        lineHeight:25,
    },
    moreBtn:{
       marginLeft:5,
    },
    Btntxt:{
        fontFamily:'Poppins-SemiBold',
        color:'#24A148',
        textDecorationLine:'underline'
    },
    midBody:{
        flexDirection:'row',
        justifyContent:'center',
        marginVertical:30
    },
    midContent:{
        fontFamily:'Jameel-Noori-Nastaleeq-Kasheeda',
        fontSize:16,
        color:'#24A148',
        textDecorationLine:'underline',
       
    },
    designContent:{
        width:30, 
        height:30,
        margin:6,
    },
    Grids:{
        
        flexDirection:'row',
       marginHorizontal:10,
       marginVertical:30,
        
    },
    GridOne:{
        borderWidth:2,
       marginHorizontal:10,
        width:110,
        height:160,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#ffb422',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor:'#fff'
        
    },
    Gridimg:{
        width:75,
        height:75,
    },
    GridNam:{
        fontSize:22,
        fontWeight:'700',
        color:'#ffb422',
        marginTop:18,
    },
    footer:{
        margin:20,
    },
    footerTxtDesign:{
        flexDirection:'row-reverse'
    },
    footerTxt:{
        fontFamily:'AlQalam Irtaza Hassan Regular',
        fontSize:30,
        color:'#24A148',
        margin:10,
    },
    footerTxtSecond:{
        fontFamily:'AlQalam Irtaza Hassan Regular',
        fontSize:30,
        color:'#ffb422',
        textAlign:'left',
        margin:10,
    }
});

export default Styles;