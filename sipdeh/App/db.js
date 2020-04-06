import React, {Component} from "react";
import {AsyncStorage} from "react-native";



class DB extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            penyusunan: 'null',
            IconcolorActive:'#424874',
            Iconcolor: '#999',
        }
   
    }
   async CreatePenyusunan(){
        let account =  await fetch('http://jdih.brebeskab.go.id/android/listStatus.php')
        .then((response) => response.json())
        .then((responseJson) => {
            this.state.penyusunan = responseJson;
                return responseJson['result'];
        }).catch((error) => {
          console.error(error);
        });
        AsyncStorage.setItem('penyusunan',JSON.stringify(account),(err,result) =>{
           if(err){
               return err;
           }
           else{  
        //    this.GetAccount();
           }
        }
        )
    }
    GetAccount(){
        
        try{
            (async () =>{
            
            await AsyncStorage.getItem('penyusunan').then((value)=>{
           
                // this.values = JSON.parse(value);
                console.log(value);
                return value;
                });
            })();
    }
    catch(error){
        
    }
    }
    Logout(){
        AsyncStorage.removeItem('profile'),(err,result)=>{
            if(err){
                return err;
            }
            console.log(result);
        }
    }



}
const db = new DB();
export default db;
