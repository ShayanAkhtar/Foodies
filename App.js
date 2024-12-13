import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Custom header for Stack Navigator
const customHeader = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>Foodies</Text>
  </View>
);

const handleLogout = (navigation) => {
  navigation.replace('Login');
};

const DrawerNavigator = ({ navigation }) => (
  <Drawer.Navigator
    screenOptions={{
      headerStyle: styles.drawerHeader,
      headerTitleStyle: styles.drawerHeaderTitle,
      drawerStyle: styles.drawerStyle,
      drawerLabelStyle: styles.drawerLabelStyle,
    }}
  >
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Profile" component={ProfileScreen} />
    <Drawer.Screen
      name="Logout"
      component={HomeScreen}
      options={{
        drawerLabel: () => (
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => handleLogout(navigation)}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        ),
      }}
    />
  </Drawer.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: styles.stackHeader,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerRight: customHeader,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen
          name="Home"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  stackHeader: {
    backgroundColor: '#FF6F61',
    elevation: 5,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FF6F61',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },

  drawerHeader: {
    backgroundColor: '#FF6F61',
    paddingVertical: 20,
  },
  drawerHeaderTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  drawerStyle: {
    backgroundColor: '#f4f4f9',
    width: 250,
  },
  drawerLabelStyle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d2d2d',
  },
  logoutButton: {
    marginTop: 'auto',
    padding: 15,
    backgroundColor: '#FF6F61',
    marginHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f9',
  },
});
