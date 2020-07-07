import React, {useContext, useEffect} from "react";
import { Text, StyleSheet, View, FlatList, Button, TouchableOpacity } from "react-native";
import {Context as BlogContext} from "../context/BlogContext.js"
import {Feather} from "@expo/vector-icons"

const IndexScreen = (props) => {
  const BlogPostReceived = useContext(BlogContext) 
  // we can destructure base on the info we are receiving
  // i.e const {state, addBlogPost, deleteBlogPost, getBlogPost} = useContext(BlogContext) ....so we instead of using BlogPostReceived.data or .addBlogPost we can easily use data and addBlogPost anywhere in our code
  
     useEffect(() => {
      BlogPostReceived.getBlogPosts()

    const listener = props.navigation.addListener('didFocus',() => {
        BlogPostReceived.getBlogPosts()
      })

      return () => {
        listener.remove()
      }
     }, [])
  
  return (
    <View>
      

      <FlatList 
      data={BlogPostReceived.state}
      keyExtractor={(blogPost) => blogPost.title}
      renderItem={({item}) => {

        return (
          <TouchableOpacity onPress={() => props.navigation.navigate('Show', {
            
            id: item.id
            // we can pass item.title directly also
              
            }
          )}>
              <View style={styles.container}>
            
                <Text style={styles.text}>{item.title}</Text>
             
                <TouchableOpacity onPress={()=> BlogPostReceived.deleteBlogPost(item.id)}>
                  <Feather style={styles.icon} name="trash"/>
                </TouchableOpacity>
              </View>
          </TouchableOpacity>
        )
      }}
      />
    </View>
  )
};


IndexScreen.navigationOptions = (props) => {
  return {
    headerRight: ()=> <TouchableOpacity onPress={() => props.navigation.navigate("Create")}>
      <Feather style={styles.header} name="plus" size={30} />
      </TouchableOpacity>,
    title: <Text>Blog List</Text>
    // headerStyle: {
    //    backgroundColor: "#258031"
    // }
  }
}


const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 10

  },
  icon: {
    fontSize: 26,
    alignSelf: "center"
  },
  header: {
    marginRight: 10,
    color: "white"
  }
});

export default IndexScreen;
