import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export default function CrearPublicacion({ navigation }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  const agregarPublicacion = async () => {
    if (!titulo.trim() || !descripcion.trim() || !imagenUrl.trim()) {
      Alert.alert("Error", "Por favor llena todos los campos");
      return;
    }

    try {
      await axios.post("http://192.168.0.103:3000/posts", {titulo, descripcion, categoria, imagen: imagenUrl,});

      Alert.alert("Éxito", "Publicación agregada");
      setTitulo("");
      setDescripcion("");
      setCategoria("");
      setImagenUrl(""); navigation.goBack(); 
    } catch (error) {
      console.error("Error al agregar publicación", error);
      Alert.alert("Error", "No se pudo agregar la publicación");
    }
  };

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Agregar Publicación</Text>
      </View>

      {/* Formulario */}
      <View style={styles.form}>
        <Text style={styles.label}>Título</Text>
        <TextInput style={styles.input} placeholder="Escribe el título" value={titulo} onChangeText={setTitulo}/>

        <Text style={styles.label}>Descripción</Text>
        <TextInput style={[styles.input, { height: 100 }]} placeholder="Escribe la descripción" value={descripcion} onChangeText={setDescripcion} multiline />

        <Text style={styles.label}>Categoría</Text>
        <TextInput style={styles.input} placeholder="Ej: Viaje, Estudio, Personal" value={categoria} onChangeText={setCategoria} />

        <Text style={styles.label}>URL de la Imagen</Text>
        <TextInput style={styles.input} placeholder="https://..." value={imagenUrl} onChangeText={setImagenUrl}/>
        {imagenUrl ? (
          <Image source={{ uri: imagenUrl }} style={styles.previewImage} />
        ) : null}

        <TouchableOpacity style={styles.button} onPress={agregarPublicacion}>
          <Text style={styles.buttonText}>Publicar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, 
    backgroundColor: "#fff" 
},
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  backButton: { 
    marginTop:20,
    flexDirection: "row", 
    alignItems: "center" 
},
  backText: { 
    marginLeft: 5, 
    fontSize: 16,
    marginTop:20 
},
  navTitle: { 
    flex: 1, 
    textAlign: "center", 
    fontSize: 18, 
    fontWeight: "bold",
    marginTop:15 
},

  form: { 
    padding: 20 
},
  label: { 
    fontSize: 16, 
    fontWeight: "bold", 
    marginTop: 20 
},
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#a498a8ff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" 
},
});

