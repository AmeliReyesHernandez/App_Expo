import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export default function CrearAmigos({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");

  const agregarAmigo = async () => {
    if (!nombre || !correo || !telefono) {
      Alert.alert( "Error", "Por favor completa todos los campos obligatorios (Nombre, Correo y Teléfono)." );
      return;
    }

    try {
      await axios.post("http://192.168.0.103:3000/amigos", { nombre, correo, telefono });
      Alert.alert("Éxito", "Amigo agregado correctamente"); navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo agregar el amigo");
    }
  };

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={25} color="#000" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Agregar Amigo</Text>
      </View>

      {/* Formulario */}
      <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
      <TextInput placeholder="Correo" value={correo} onChangeText={setCorreo} keyboardType="email-address" autoCapitalize="none" textContentType="emailAddress" style={styles.input}/>
      <TextInput placeholder="Teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" style={styles.input} />

      <TouchableOpacity style={styles.button} onPress={agregarAmigo}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f2f2f2", 
    padding: 20 
  },
  navbar: { 
    flexDirection: "row", 
    alignItems: "center", 
    paddingBottom: 20 
  },
  navTitle: { 
    flex: 1, 
    textAlign: "center", 
    fontSize: 20, 
    fontWeight: "bold" 
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#a498a8ff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold", 
    fontSize: 16 
  },
});



