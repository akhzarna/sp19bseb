import React from 'react'
import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({

    container:{
        flex:1,
        position:'relative',
        backgroundColor:'#fff',
    },
    poster:{
        width:'100%',
        height:200,
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
    },
    backbtn:{
        position:'absolute',
        top:5,
        left:8,
        height:50,
        width:50,
        padding:10,
        borderRadius:100/2,
        backgroundColor:'rgba(217, 215, 215, 0.9)'
    },
    searchbarDesign:{
      width:'90%',
      alignSelf:'center',
      marginTop:-10,
      borderRadius:20,
      backgroundColor:'#fff',
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity:  0.4,
      shadowRadius: 3,
      elevation: 4,
      paddingHorizontal:20,
      flexDirection:'row-reverse',
      alignItems:'center'
    },
    bookSearch:{

        marginHorizontal:10,
        borderRightWidth:1,
        borderColor:'#e5e5e5',
        paddingHorizontal:10,
        fontSize:16,

    },
    midSection:{
        flex:1,
        alignItems:'center',
        marginTop:20,
    },
    Grid:{
        width:'90%',
        height:120,
        backgroundColor:'#fafafa',
        borderRadius:20,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,
        flexDirection:'row',
        alignItems:'center',
        borderLeftWidth:2,
        borderColor:'#24A148',
        marginVertical:10,
    },
    Gridimg:{
        flex:2,

    },
    Proimage:{
        width:'80%',
        height:'80%',
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
    },
    GridContent:{
        flex:4,

    },
    MainTitle:{
        color:'#18191A',
        fontFamily:'Poppins-SemiBold',
        fontSize:18,
        marginRight:20,
    },
    Details:{
        fontFamily:'Poppins-Regular',
    color:'#a5a5a5',
    fontSize:14,
    marginRight:20,
    },
    action:{
        flex:2,
    }

});

export default Styles;
