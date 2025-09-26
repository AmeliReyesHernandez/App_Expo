import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity,ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Publicaciones from "./Publicaciones";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Perfil */}
      <View style={styles.profileCard}>
        <Image
          source={{
            uri: "https://i.pinimg.com/736x/df/df/c3/dfdfc355aae1c75fa555bf473d109343.jpg",}}style={styles.avatar}/>

        <Text style={styles.name}>Ameli Reyes</Text>
        <Text style={styles.bio}> Estudia Ing en Sistemas y reprobó </Text>
      </View>

      {/* Cards */} 
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("CrearPublicacion")}> 
        <Ionicons name="add-circle-outline" size={20} color="#000" style={styles.cardIcon}/>
        <Text style={styles.cardText}>Agregar Publicación</Text> 
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Amigos")}> 
        <Ionicons name="people-outline" size={20} color="#000" style={styles.cardIcon}/>
        <Text style={styles.cardText}>Amigos</Text> 
      </TouchableOpacity>

      {/* Publicaciones recientes */}
      <Publicaciones showNavbar={false} />
 </ScrollView>

      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home" size={24} color="#000000ff" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} >
          <Ionicons name="person-circle-outline" size={24} color="#000000ff" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Config")}>
          <Ionicons name="settings-outline" size={24} color="#000000ff" />
          <Text style={styles.navText}>Config</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e0e0ff",
    marginTop:15,
    paddingTop: 10
  },
  scrollContainer: {
    padding: 15,
    paddingBottom: 80,
    flexGrow:1
  },
  profileCard: {
    width: "100%", 
    alignItems: "center",
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },
  CardPublic: {
    width: 400, 
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 0,
    elevation: 3,
  },
  publicTitle: {
  width:"100%",
  fontSize: 20,
  fontWeight: "bold",
  color: "#323a6dff",   
  textAlign: "center",
  marginVertical: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop:8
  },
  bio: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginTop: 4
  },
  card: {
    width: "100%", 
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    flexDirection: "row",      
    alignItems: "center",  
    justifyContent: "center",
  },
  cardIcon:{
     marginRight: 10, 
  },
  cardText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ffffffff",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#000000ff",
    marginTop: 3,
  },
});

