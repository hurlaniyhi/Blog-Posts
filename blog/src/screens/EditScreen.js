import React, {useContext, useState} from 'react'
import {Text, View, TextInput, StyleSheet, Button, TouchableOpacity} from 'react-native'
import {Context as BlogContext} from "../context/BlogContext"

const EditBlog = (props) => {

   
    const {state, editBlogPost} = useContext(BlogContext) // we can also use const receive = useContext(BlogContext) which we will now use recieve.addBlogPost tos access addblogPost from context 
    
    const received = props.navigation.getParam("id")
    const blogContent = state.find((blogpost) => blogpost.id === received)

    const [newTitle, setNewTitle] = useState(blogContent.title)
    const [newContent, setNewContent] = useState(blogContent.content)

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Enter New Title</Text>
            <TextInput style={styles.textInput} value={newTitle} onChangeText={(value) => setNewTitle(value)} />
            <Text style={styles.text}>Enter New Content</Text>
            <TextInput style={styles.textInput} value={newContent} onChangeText={(value) => setNewContent(value)} />
            <Button 
            style={styles.button} 
            title="Save" 
            onPress={() => {
                editBlogPost(newTitle, newContent, received, props) //
                // props.navigation.navigate('Index') can be easily used like this to navigate back to the indexscreen instead of passing the 3rd parameter(props) which is used like props.navigation.navigate('Index') in the addBlogPost function inside context file
                // the reason for passing the props and used props.navigation.navigate('Index') in the addBlogPost
                // is because we might want to make a request to an API which base on the response gotten, we will then navigate.  
            }}
            />
        </View>
    )
}


EditBlog.navigationOptions = (props) => {
    return {
      title: "Edit Blog"
    }
  }

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginTop: 30
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        paddingBottom: 5
    },
    textInput: {
        borderWidth: 1,
        height: 40,
        marginBottom: 15,
        paddingLeft: 10
    },
    button: {
        
    }
})

export default EditBlog