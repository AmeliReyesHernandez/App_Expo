import React, { useState, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

export default function Publicaciones() {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({}); // { idPost: true/false }

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://192.168.200.71:3000/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error al cargar publicaciones", error);
    }
  };

  useFocusEffect( useCallback(() => {fetchPosts();}, []));

  const eliminarPost = async (id) => {
    try {
      await axios.delete(`http://192.168.200.71:3000/posts/${id}`);
      Alert.alert("Éxito", "Publicación eliminada");
      fetchPosts();
    } catch (error) {
      console.error("Error al eliminar publicación", error);
      Alert.alert("Error", "No se pudo eliminar");
    }
  };

  const toggleLike = (id) => { setLikes((prev) => ({ ...prev, [id]: !prev[id] })); };

  const renderItem = ({ item }) => (
    <View style={styles.postCard}>
      <Image source={{ uri: item.imagen || "https://picsum.photos/200/300" }}style={styles.postImage}/>
      <Text style={styles.postTitle}>{item.titulo}</Text>
      {item.categoria && <Text style={styles.postCategory}>{item.categoria}</Text>}
      <Text style={styles.postDescripcion}>{item.descripcion}</Text>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => toggleLike(item.id)}>
          <Ionicons name={likes[item.id] ? "heart" : "heart-outline"} size={24} color={likes[item.id] ? "red" : "black"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => eliminarPost(item.id)}>
          <Ionicons name="trash" size={24} color="red" style={{ marginLeft: 20 }} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
      <View style={styles.container}>
        {posts.length === 0 ? (
          <Text style={styles.noPostsText}>No hay publicaciones</Text>
        ) : (
        <FlatList data={posts} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} scrollEnabled={false} />
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#e0e0e0ff", 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 10,
  },
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 20,
    padding: 15,
    elevation: 3,
  },
    postImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 15,
    marginVertical: 10,
  },
  postTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 5 
  },
  postCategory: { 
    fontSize: 14, 
    color: "#996565ff", 
    marginBottom: 5, 
    fontStyle: "italic" 
  },
  postDescripcion: { 
    fontSize: 16, 
    marginBottom: 10 
  },
  actions: { 
    flexDirection: "row", 
    alignItems: "center" 
  },
});



