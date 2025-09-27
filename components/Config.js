import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Config({ navigation }) {
  const [modoOscuro, setModoOscuro] = useState(false);

  const toggleModoOscuro = () => {
    setModoOscuro(!modoOscuro);
    Alert.alert("Modo Oscuro", !modoOscuro ? "Activado" : "Desactivado");
  };

  // Estilos modo oscuro
  const fondo = modoOscuro ? "#121212" : "#fff";
  const texto = modoOscuro ? "#fff" : "#000";
  const borderColor = modoOscuro ? "#444" : "#ccc";

  return (
    <View style={[styles.container, { backgroundColor: fondo }]}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={27} color={texto} />
        </TouchableOpacity>
        <Text style={[styles.navTitle, { color: texto }]}>Configuración</Text>
      </View>

      {/* Opciones */}
      <TouchableOpacity style={[styles.option, { borderBottomColor: borderColor }]} onPress={toggleModoOscuro}>
        <Ionicons name="moon-outline" size={24} color={texto} />
        <Text style={[styles.optionText, { color: texto }]}>Modo Oscuro</Text>
        <Switch value={modoOscuro} onValueChange={toggleModoOscuro} style={{ marginLeft: "auto" }}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },
  navbar: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: { 
    flexDirection: "row", 
    alignItems: "center" 
  },
  navTitle: { 
    flex: 1, 
    textAlign: "center", 
    fontSize: 18, 
    fontWeight: "bold" 
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  optionText: { 
    marginLeft: 15, 
    fontSize: 16 
  },
});
