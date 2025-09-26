import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Home({ navigation }) {
  const [publicaciones, setPublicaciones] = useState([
    {
      id: 1,
      usuario: "Kimby Hernandez",
      fotoUsuario: "https://i.pinimg.com/1200x/97/c5/ea/97c5eaf67fd41e69cd7e74f07497ada1.jpg",
      titulo: "Mi primer post",
      fotoPost: "https://i.pinimg.com/736x/04/34/34/043434c596ec2cad949b1d04b2338f59.jpg",
      likes: 0,
      comentarios: [],
    },
    {
      id: 2,
      usuario: "Irvin SJ",
      fotoUsuario: "https://i.pinimg.com/1200x/6d/4d/fd/6d4dfd8119ccb66064db931533bfb620.jpg",
      titulo: "Leyendo",
      fotoPost: "https://picsum.photos/400/200",
      likes: 2,
      comentarios: [],
    },
    {
      id: 3,
      usuario: "Marco Rosas",
      fotoUsuario: "https://i.pinimg.com/736x/eb/b8/ad/ebb8ade992f558931ba7d5dc46bd95da.jpg",
      titulo: "Estresado",
      fotoPost: "https://i.pinimg.com/736x/97/7b/3a/977b3ae1a07b9723669a6bc18d66b24a.jpg",
      likes: 2,
      comentarios: [],
    },
    {
      id: 4,
      usuario: "Sandy Marissa",
      fotoUsuario: "https://i.pinimg.com/736x/da/10/23/da1023268efcddf8823b25ee5c6851ef.jpg",
      titulo: "En una peda",
      fotoPost: "https://i.pinimg.com/736x/3d/b6/f6/3db6f6eacdaf294c9eaa54d45923a590.jpg",
      likes: 2,
      comentarios: [],
    },
    {
      id: 5,
      usuario: "Blanca Estela",
      fotoUsuario: "https://i.pinimg.com/736x/f4/f5/af/f4f5af56f85d29d258343da5b4d4f26f.jpg",
      titulo: "Viajando",
      fotoPost: "https://i.pinimg.com/736x/03/b2/e1/03b2e17674c05947fe0335700b40c9dc.jpg",
      likes: 5,
      comentarios: [],
    },
  ]);

  // Función para dar like
  const darLike = (id) => {
    setPublicaciones((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  // Función para agregar comentario
  const agregarComentario = (id) => {
    const comentario = "¡Buen post!";
    setPublicaciones((prev) =>
      prev.map((post) =>
        post.id === id
          ? { ...post, comentarios: [...post.comentarios, comentario] }
          : post
      )
    );
    Alert.alert("Comentario agregado", "¡Has comentado el post!");
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* Header usuario */}
      <View style={styles.header}>
        <Image source={{ uri: item.fotoUsuario }} style={styles.fotoUsuario} />
        <Text style={styles.usuario}>{item.usuario}</Text>
      </View>

      {/* Título y descripción */}
      <Text style={styles.titulo}>{item.titulo}</Text>

      {/* Imagen de publicación */}
      {item.fotoPost && (
        <Image source={{ uri: item.fotoPost }} style={styles.fotoPost} />
      )}

      {/* Botones de acción */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => darLike(item.id)}>
          <Ionicons name="heart-outline" size={22} color="red" />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => agregarComentario(item.id)}>
          <Ionicons name="chatbubble-outline" size={22} color="black" />
          <Text style={styles.actionText}>{item.comentarios.length}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Navbar superior */}
      <View style={styles.topNavbar}>
        <Text style={styles.navTitle}>Home</Text>
      </View>

      {/* Lista de publicaciones */}
      <FlatList data={publicaciones} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} contentContainerStyle={{ padding: 10, paddingBottom: 90 }} />

      {/* Navbar inferior */}
      <View style={styles.bottomNavbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home" size={28} color="#000000ff" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Perfil")}>
          <Ionicons name="person-circle-outline" size={28} color="#000000ff" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Config")}>
          <Ionicons name="settings-outline" size={28} color="#000000ff" />
          <Text style={styles.navText}>Config</Text>
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
  topNavbar: {
    height: 70,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginTop: 6
  },
  navTitle: { 
    fontSize: 20, 
    fontWeight: "bold" 
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 10 
  },
  fotoUsuario: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    marginRight: 10 
  },
  usuario: { 
    fontWeight: "bold", 
    fontSize: 16 
  },
  titulo: { 
    fontSize: 15, 
    fontWeight: "bold", 
    marginBottom: 5 
  },
  fotoPost: { 
    width: "100%", 
    height: 200, 
    borderRadius: 10, 
    marginBottom: 10 
  },
  actions: { 
    flexDirection: "row", 
    justifyContent: "flex-start" 
  },
  actionButton: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginRight: 20 
  },
  actionText: { 
    marginLeft: 5, 
    fontWeight: "bold" 
  },
  bottomNavbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navItem: { 
    alignItems: "center" 
  },
  navText: { 
    fontSize: 12, 
    color: "#000000ff",
     marginTop: 3 
    },
});
