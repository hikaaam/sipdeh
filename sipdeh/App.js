import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";


// classes
import Splash from './App/splash';
import Login from './App/stack/login';
import Home from './App/stack/home/home';
import Profile from './App/stack/profile';
import Perda from './App/stack/home/perda/perda';
import Pie from './App/stack/home/perda/pie';
import Pie2 from './App/stack/home/perbup/pie';
import Perbup from './App/stack/home/perbup/perbup';
import Penyusunan from './App/stack/home/penyusunan/penyusunan';
import Detail_penyusunan from './App/stack/home/penyusunan/penyusunan_detail';
import Pdf_list from './App/stack/home/perbup/pdfList';
import Pdf_view from './App/stack/home/perbup/pdf';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ navigation }) => (
            {
              headerRight: () => (
                <TouchableOpacity
                  style={
                    {
                      marginRight: 20
                    }}
                  onPress={() => {
                    try {
                      (async () => {

                        await AsyncStorage.getItem('profile').then((value) => {
                          if (value) {
                            console.log(value);
                            navigation.navigate('profile');
                          }
                          else {
                            console.log(value);
                            navigation.navigate('login');
                          }

                        });
                      })();
                    }
                    catch{

                    }


                  }}
                >
                  <Icon name='user' size={35} color="white" />
                </TouchableOpacity>
              ),
              headerTitleStyle: { color: 'white' },
              headerTintColor: 'white'
            }
          )}
        >
          <Stack.Screen name='splashscreen' component={Splash} 
          options={
            {
              headerShown:false,
            }
          }
          />

          <Stack.Screen name='home' component={Home}
            options={
              ({
                headerTitle: props => 
                <View style={{
                  justifyContent:'center'
                }}>
                  <Text style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'white'
                  }}>SIPDEH</Text>
                  <Text 
                  style={{
                    color:'white',
                    fontWeight:'bold'
                  }}
                  >Sistem Informasi Produk Hukum Daerah</Text>
                </View>,
                // headerTitleStyle: {
                //   fontSize: 25,
                //   fontWeight: 'bold',
                //   color: 'white'
                // },
                headerStyle: {
                  backgroundColor: 'red'
                },

              })
            }
          />
          <Stack.Screen name='login' component={Login} options={
            ({
              headerTitle: 'Login',
              headerTitleStyle: {
                fontSize: 25,
                fontWeight: 'bold',
                color: 'white'
              },
              headerStyle: {
                backgroundColor: '#4dabf5'
              },
              headerRight:false

            })
          } />
          <Stack.Screen name='profile' component={Profile}
            options={
              ({
                headerTitle: 'Profile',
                headerTitleStyle: {
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: 'white'
                },
                headerStyle: {
                  backgroundColor: '#4dabf5'
                },
                headerRight:false
              })
            }
          />
          <Stack.Screen name='perda' component={Perda}
            options={
              ({
                headerTitle: 'Peraturan Daerah',
                headerTitleStyle: {
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: 'white'
                },
                headerStyle: {
                  backgroundColor: '#2c91e1'
                },

              })
            }
          />
          <Stack.Screen name='perbup' component={Perbup}
            options={
              ({
                headerTitle: 'Peraturan Bupati',
                headerTitleStyle: {
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: 'white'
                },
                headerStyle: {
                  backgroundColor: '#2c91e1'
                },

              })
            }
          />
          <Stack.Screen name='pie' component={Pie}
            options={
              ({
                headerTitle: 'Analysis Perda',
                headerTitleStyle: {
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'white'
                },
                headerStyle: {
                  backgroundColor: '#2c91e1'
                },

              })
            }
          />
          <Stack.Screen name='pie2' component={Pie2}
            options={
              ({
                headerTitle: 'Analysis Perbup',
                headerTitleStyle: {
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'white'
                },
                headerStyle: {
                  backgroundColor: '#2c91e1'
                },

              })
            }
          />
          <Stack.Screen name='penyusunan' component={Penyusunan}
            options={
              ({
                headerTitle: 'Penyusunan',
                headerTitleStyle: {
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: 'white'
                },
                headerStyle: {
                  backgroundColor: '#2c91e1'
                },

              })
            }
          />
          <Stack.Screen name='detail_penyusunan' component={Detail_penyusunan}
            options={
              ({
                headerTitle: 'Detail Penyusunan',
                headerTitleStyle: {
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: 'white'
                },
                headerStyle: {
                  backgroundColor: 'green'
                },

              })
            }
          />
          <Stack.Screen name='pdflist' component={Pdf_list}
            options={
              ({
                headerTitle: 'Pdf List',
                headerTitleStyle: {
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: 'white'
                },
                headerStyle: {
                  backgroundColor: 'green'
                },

              })
            }
          />
          <Stack.Screen name='pdfview' component={Pdf_view}
            options={
              ({
                headerTitle: 'Pdf View',
                headerTitleStyle: {
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: 'white'
                },
                headerStyle: {
                  backgroundColor: 'green'
                },

              })
            }
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
