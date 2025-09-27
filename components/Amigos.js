import React, { useState, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

export default function Amigos({ navigation }) {
  const [amigos, setAmigos] = useState([]);

  // Traer amigos desde el backend
  const fetchAmigos = useCallback(async () => {
    try {
      const response = await axios.get("http://192.168.200.71:3000/amigos");
      if (Array.isArray(response.data)) {
        setAmigos(response.data);
      } else {
        console.warn("El backend no devolvió un arreglo:", response.data);
        setAmigos([]);
      }
    } catch (error) {
      console.error("Error al cargar amigos", error);
      Alert.alert("Error", "No se pudieron cargar los amigos");
    }
  }, []);

  // Se ejecuta cada vez que vuelves a la pantalla
  useFocusEffect( useCallback(() => { fetchAmigos(); return () => {}; // Evitar advertencias
   }, [fetchAmigos])
  );

  // Eliminar amigo en backend
  const eliminarAmigo = async (id) => {
    try {
      await axios.delete(`http://192.168.200.71:3000/amigos/${id}`);
      Alert.alert("Éxito", "Amigo eliminado");
      fetchAmigos(); 
    } catch (error) {
      console.error("Error al eliminar amigo", error);
      Alert.alert("Error", "No se pudo eliminar");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.amigoCard}>
      <Image source={{ uri: item.imagen || "https://i.pinimg.com/1200x/45/1f/2e/451f2e4eb5964ba0afa25d9a19bf2d4d.jpg" }} style={styles.foto} />
      <View style={{ flex: 1 }}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.detalle}>Correo: {item.correo}</Text>
        <Text style={styles.detalle}>Tel: {item.telefono}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => eliminarAmigo(item.id)}>
          <Ionicons name="trash-outline" size={22} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={25} color="#000" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Mis Amigos</Text>
      </View>

      {/* Lista de amigos */}
      {amigos.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>No hay amigos registrados</Text>
      ) : (
        <FlatList data={amigos} keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())} renderItem={renderItem} contentContainerStyle={{ padding: 20, paddingBottom: 80 }} />
      )}

      {/* Botón agregar */}
      <View style={styles.form}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CrearAmigos")} >
          <Ionicons name="person-add-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}> Agregar Amigo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f2f2f2" 
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: { 
    flexDirection:"row",
    marginTop: 15,
    alignItems:"center" 
  },
  navTitle: { 
    flex: 1, 
    textAlign: "center", 
    fontSize: 18, 
    fontWeight: "bold",
    marginTop:15 
},
  amigoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    elevation: 2,
  },
  foto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
},
  nombre: { 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  detalle: { 
    fontSize: 14, 
    color: "#555" 
  },
  form: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    elevation: 1,
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#a498a8ff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { 
    color: "#fff", 
    fontWeight: "bold", 
    marginLeft: 5 
  },
});

