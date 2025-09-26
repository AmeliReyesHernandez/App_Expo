import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function App() {
  const [color, setColor] = useState("white");

  const cambiarColor = () => {
    const colores = ["skyblue", "lightgreen", "pink", "orange", "purple"];
    const nuevoColor = colores[Math.floor(Math.random() * colores.length)];
    setColor(nuevoColor);
  };
  

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <TouchableOpacity style={styles.boton} onPress={cambiarColor}>
        <Text style={styles.textoBoton}>Cambiar color</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  boton: {
    backgroundColor: "#000000ff", 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoBoton: {
    color: "white", 
    fontSize: 16,
    fontWeight: "bold",
  },
});