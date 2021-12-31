import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  Image,
} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// classes
import Splash from './App/splash';
import Login from './App/new/login';
import Home from './App/new/home/home';
import Profile from './App/new/profile';
import Perda from './App/new/home/perda/perda';
import Pie from './App/new/home/perda/pie';
import Pie2 from './App/new/home/perbup/pie';
import Perbup from './App/new/home/perbup/perbup';
import Penyusunan from './App/new/home/penyusunan/new_penyusunan_detail';
import penyusunanAll from './App/new/home/penyusunan/penyusunan';
import Detail_penyusunan from './App/new/home/penyusunan/penyusunan_detail';
import Pdf_list from './App/new/home/perbup/pdfList';
import Pdf_view from './App/new/home/perbup/pdf';
import pdf_editor from './App/new/pdfviewer';
import Icon from 'react-native-vector-icons/FontAwesome';
import createSk from './App/new/home/penyusunan/createSK';
import db from './App/db';
import notifikasi from './App/new/notifikasi';
const Stack = createStackNavigator();
import {store, persistor} from './App/Redux';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heigth: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    };
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={({navigation}) => ({
                headerStyle: {
                  backgroundColor: db.state.lightheader,
                  height: this.state.heigth / 12,
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                },
                headerLeft: props => (
                  <Icon
                    name="chevron-left"
                    onPress={() => navigation.goBack(null)}
                    size={35}
                    color="white"
                    style={{
                      marginLeft: 20,
                    }}
                  />
                ),
                headerRight: () => (
                  <TouchableOpacity
                    style={{
                      marginRight: 20,
                    }}
                    onPress={() => {
                      // try {
                      //   (async () => {
                      //     await AsyncStorage.getItem('profile').then((value) => {
                      //       if (value) {
                      //         console.log(value);
                      //         navigation.navigate('profile');
                      //       }
                      //       else {
                      //         console.log(value);
                      //         navigation.navigate('login');
                      //       }
                      //     });
                      //   })();
                      // }
                      // catch{
                      // }
                    }}>
                    <Image
                      style={{
                        width: db.state.width / 10,
                        height: db.state.width / 10,
                      }}
                      source={require('./assets/images/logo.png')}
                    />
                  </TouchableOpacity>
                ),
                headerTitleStyle: {color: 'white'},
                headerTintColor: 'white',
              })}>
              <Stack.Screen
                name="splashscreen"
                component={Splash}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="home"
                component={Home}
                options={{
                  headerTitle: props => (
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        marginLeft: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: this.state.width / 19,
                          fontWeight: 'bold',
                          fontFamily: 'roboto',
                          color: 'white',
                        }}>
                        SIPDEH!
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                        }}>
                        Bagian Hukum Setda Brebes
                      </Text>
                    </View>
                  ),
                  headerLeft: props => (
                    <Image
                      style={{
                        width: db.state.width / 10,
                        height: db.state.width / 10,
                        marginLeft: 20,
                      }}
                      source={require('./assets/images/Brebes.png')}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="createSk"
                component={createSk}
                options={{
                  headerTitle: props => (
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        marginLeft: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: this.state.width / 19,
                          fontWeight: 'bold',
                          fontFamily: 'roboto',
                          color: 'white',
                        }}>
                        SIPDEH!
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                        }}>
                        Bagian Hukum Setda Brebes
                      </Text>
                    </View>
                  ),
                  headerLeft: props => (
                    <Image
                      style={{
                        width: db.state.width / 10,
                        height: db.state.width / 10,
                        marginLeft: 20,
                      }}
                      source={require('./assets/images/Brebes.png')}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="login"
                component={Login}
                options={{
                  headerTitle: props => (
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        marginLeft: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: this.state.width / 19,
                          fontWeight: 'bold',
                          fontFamily: 'roboto',
                          color: 'white',
                        }}>
                        SIPDEH!
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                        }}>
                        Bagian Hukum Setda Brebes
                      </Text>
                    </View>
                  ),
                  headerLeft: props => (
                    <Image
                      style={{
                        width: db.state.width / 10,
                        height: db.state.width / 10,
                        marginLeft: 20,
                      }}
                      source={require('./assets/images/Brebes.png')}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="profile"
                component={Profile}
                options={{
                  headerTitle: props => (
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        marginLeft: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: this.state.width / 19,
                          fontWeight: 'bold',
                          fontFamily: 'roboto',
                          color: 'white',
                        }}>
                        SIPDEH!
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                        }}>
                        Bagian Hukum Setda Brebes
                      </Text>
                    </View>
                  ),
                  headerLeft: props => (
                    <Image
                      style={{
                        width: db.state.width / 10,
                        height: db.state.width / 10,
                        marginLeft: 20,
                      }}
                      source={require('./assets/images/Brebes.png')}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="perda"
                component={Perda}
                options={{
                  headerTitle: 'Peraturan Daerah',
                  headerTitleStyle: {
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: 'white',
                  },
                }}
              />
              <Stack.Screen
                name="perbup"
                component={Perbup}
                options={{
                  headerTitle: 'Peraturan Bupati',
                  headerTitleStyle: {
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: 'white',
                  },
                }}
              />
              <Stack.Screen
                name="pie"
                component={Pie}
                options={{
                  headerTitle: 'Statistik',
                  headerTitleStyle: {
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: 'white',
                  },
                }}
              />
              <Stack.Screen
                name="pie2"
                component={Pie2}
                options={{
                  headerTitle: 'Analysis Perbup',
                  headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white',
                  },
                }}
              />
              <Stack.Screen
                name="penyusunan"
                component={Penyusunan}
                options={{
                  headerTitle: props => (
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        marginLeft: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: this.state.width / 19,
                          fontWeight: 'bold',
                          fontFamily: 'roboto',
                          color: 'white',
                        }}>
                        SIPDEH!
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                        }}>
                        Bagian Hukum Setda Brebes
                      </Text>
                    </View>
                  ),
                  headerLeft: props => (
                    <Image
                      style={{
                        width: db.state.width / 10,
                        height: db.state.width / 10,
                        marginLeft: 20,
                      }}
                      source={require('./assets/images/Brebes.png')}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="penyusunanall"
                component={penyusunanAll}
                options={{
                  headerTitle: props => (
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        marginLeft: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: this.state.width / 19,
                          fontWeight: 'bold',
                          fontFamily: 'roboto',
                          color: 'white',
                        }}>
                        SIPDEH!
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                        }}>
                        Bagian Hukum Setda Brebes
                      </Text>
                    </View>
                  ),
                  headerLeft: props => (
                    <Image
                      style={{
                        width: db.state.width / 10,
                        height: db.state.width / 10,
                        marginLeft: 20,
                      }}
                      source={require('./assets/images/Brebes.png')}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="notifikasi"
                component={notifikasi}
                options={{
                  headerTitle: props => (
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        marginLeft: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: this.state.width / 19,
                          fontWeight: 'bold',
                          fontFamily: 'roboto',
                          color: 'white',
                        }}>
                        SIPDEH!
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                        }}>
                        Bagian Hukum Setda Brebes
                      </Text>
                    </View>
                  ),
                  headerLeft: props => (
                    <Image
                      style={{
                        width: db.state.width / 10,
                        height: db.state.width / 10,
                        marginLeft: 20,
                      }}
                      source={require('./assets/images/Brebes.png')}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="detail_penyusunan"
                component={Detail_penyusunan}
                options={{
                  headerTitle: 'Detail Penyusunan',
                  headerTitleStyle: {
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: 'white',
                  },
                }}
              />
              <Stack.Screen
                name="pdflist"
                component={Pdf_list}
                options={{
                  headerTitle: 'List Peraturan',
                  headerTitleStyle: {
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: 'white',
                  },
                }}
              />
              <Stack.Screen
                name="pdfview"
                component={Pdf_view}
                options={{
                  headerTitle: 'Detail Peraturan',
                  headerTitleStyle: {
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: 'white',
                  },
                }}
              />
              <Stack.Screen
                name="pdfeditor"
                component={pdf_editor}
                options={{
                  headerTitle: 'Baca Peraturan',
                  headerTitleStyle: {
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: 'white',
                  },
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
