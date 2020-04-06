import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
class pdf extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading:true,
        dataSource:''
    };
  }
  download(){
    // let link2 = 'http://192.168.43.47/jdih_brebes-master/download.php?path='+this.state.dataSource;
    let link = 'http://jdih.brebeskab.go.id/android/download.php?path='+this.state.dataSource;
          fetch(link).then((response) => 
                    response.json()).then((responseJson) => {     
            
                    });
            Linking.openURL('http://jdih.brebeskab.go.id/uploads/hukum/'+this.state.dataSource);

  }
  componentDidMount(){
      this.setState(
          {
              isLoading:false,
              dataSource:this.props.route.params.data
          }
      )
  }
  render() {
    if(this.state.isLoading){
       return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size='large' animating />
         </View>
       )     
    }
    else{
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={()=>{
                  this.download();

                }}>
              <Icon name="file-pdf" size={190} color="red" />
               <Text style={{fontSize:28}}> {this.state.dataSource} </Text>
               </TouchableOpacity>
            </View>
          );
    }
  }
}

export default pdf;
