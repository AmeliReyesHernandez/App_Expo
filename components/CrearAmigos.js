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
      await axios.post("http://192.168.200.71:3000/amigos", { nombre, correo, telefono });
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
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Agregar Amigo</Text>
      </View>

      {/* Formulario */}
            <View style={styles.form}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput style={styles.input} placeholder="Escribe el nombre" value={nombre} onChangeText={setNombre} />
      
              <Text style={styles.label}>Correo</Text>
              <TextInput style={styles.input} placeholder="Escribe el correo" value={correo} onChangeText={setCorreo} keyboardType="email-address" autoCapitalize="none" />
      
              <Text style={styles.label}>Teléfono</Text>
              <TextInput style={styles.input} placeholder="Numero de telefono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" maxLength={10} />
      
      <TouchableOpacity style={styles.button} onPress={agregarAmigo}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fafafaff", 
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  navTitle: { 
    flex: 1, 
    textAlign: "center", 
    fontSize: 18, 
    fontWeight: "bold" ,
    maginTop: 15
  },
  backButton: { 
    marginTop:20,
    flexDirection: "row", 
    alignItems: "center" 
},
  form: { 
    padding: 20 
},
  label: { 
    fontSize: 16, 
    fontWeight: "600", 
    marginTop: 20 
},
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#a498a8ff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop:20
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold", 
    fontSize: 16 
  },
});



