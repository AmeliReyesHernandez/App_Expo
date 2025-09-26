import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Perfil from "./components/Perfil";
import Publicaciones from "./components/Publicaciones";
import Config from "./components/Config"; 
import CrearPublicacion from "./components/CrearPublicacion";
import Amigos from "./components/Amigos";
import CrearAmigos from "./components/CrearAmigos";
import Home from "./components/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Perfil" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Publicaciones" component={Publicaciones} />
        <Stack.Screen name="Config" component={Config} />
        <Stack.Screen name="CrearPublicacion" component={CrearPublicacion} />
        <Stack.Screen name="Amigos" component={Amigos} />
        <Stack.Screen name="CrearAmigos" component={CrearAmigos}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
