import React, {useContext, useEffect} from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import {Context as BlogContext} from "../context/BlogContext"
import {EvilIcons} from "@expo/vector-icons"

const ShowBlog = (props) => {
   
    const {state, getBlogPosts} = useContext(BlogContext)
    const received = props.navigation.getParam("id")

    // useEffect(() => {
    //     getBlogPosts()
  
    //   const listener = props.navigation.addListener('didFocus',() => {
    //       getBlogPosts()
    //     })
  
    //     return () => {
    //       listener.remove()
    //     }
    //    }, [])
    

    const blogContent = state.find((blogpost) => blogpost.id === received)
    // just like filter, it loop through the array and check if each element meet the condition and gives the element that meet the condition as output

    return(
        <View style={styles.container}>
            <Text style={styles.title}>{blogContent.title}</Text>
            <Text style={styles.text}>{blogContent.content}</Text>
        </View>
    )
}


ShowBlog.navigationOptions = (props) => {
    const useReceived = props.navigation.getParam("id")
    return {
      headerRight: ()=> <TouchableOpacity onPress={() => props.navigation.navigate("Edit",  // we may not need to use ()=> ...we will get warning if we did not add ()=> but it will still work
      {
          id: useReceived
      }
      )}>
        <EvilIcons style={styles.header} name="pencil" size={45} />
        </TouchableOpacity>,
      title: <Text>Blog Details</Text>
    }
  }



const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 30, 
        borderWidth: 1
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        borderBottomWidth: 1,
        alignSelf: "center",
        paddingTop: 20
    },
    text: {
        fontSize: 18,
        paddingVertical: 30,
        paddingHorizontal: 10
    },
    header: {
        marginRight: 10,
        color: "white"
      }
})

export default ShowBlog