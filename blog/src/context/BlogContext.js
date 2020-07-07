import createDataContext from "./createDataContext"
import jsonServer from "../api/jsonServer"



const blogReducer = (state, action) => {
    
    switch (action.type){
        // case 'add_blogpost':
        //     return [...state, 
        //         {
        //             id: Math.floor(Math.random() * 99999), 
        //             title: action.payload.title,
        //             content: action.payload.content
        //         }
        //     ]
        
        case 'delete_blogpost':
            return state.filter((blogPost) => blogPost.id !== action.payload)
            // filter is used to loop through and array(state) and check each element of the array whethet it met the condition stated.
            // if it meet the condition, the element will still be inside the array else the element will not be in the array anymore  
       
        // case 'edit_blogpost':
        
        //     return state.map((blogPost) => {
        //       if (blogPost.id === action.payload.id){
        //         return {id: action.payload.id, title: action.payload.newTitle, content: action.payload.newContent}
        //         } else{
        //            return blogPost
        //         }
        // })
        
        // it loops through the array. for each element, it checks if the element.id is equal to the action.payload.id
        // if its equal, it replaces that particular element with action.payload(id,newtitle and newcontent)
        // if its not equal, the element remains the way it is 


       // ALTERNATIVE WAY BUT NOT IDEAL
        //     return [...state.filter((edit) => edit.id !== action.payload.id),
         
        //         {
        //         id: action.payload.id,
        //         title: action.payload.newTitle,
        //         content: action.payload.newContent
        //     }
        // ]

        case 'get_blogposts':
            return action.payload

        default:
            return state
    }
}
    // this function is an action that make request to outside api and also called the dispatch function
    const getBlogPosts = (dispatch) =>{
        return async () => {
            const response = await jsonServer.get("/blogposts")
            
            dispatch({type: 'get_blogposts', payload: response.data})
        }
    }
    

    const addBlogPost = (dispatch) => {
        
        return async (title, content, props) =>{
            const data = {
                title: title,
                content: content
            }
            const response = await jsonServer.post("/blogposts", data)
           // dispatch({type: 'add_blogpost', payload: {title: title, content: content}})
            props.navigation.navigate('Index')
        }
    }


    const deleteBlogPost = (dispatch) => {
        
        return async (id) =>{
            const response = await jsonServer.delete(`/blogposts/${id}`)

            const response1 = await jsonServer.get("/blogposts")
            
            dispatch({type: 'get_blogposts', payload: response1.data})

           // dispatch({type: 'delete_blogpost', payload: id})
        }
    }

    const editBlogPost = (dispatch) => {
        
        return async (newTitle, newContent, id, props ) =>{
            const data = {
                title: newTitle,
                content: newContent
            }
            const response = await jsonServer.put(`/blogposts/${id}`, data)
            
             const response1 = await jsonServer.get("/blogposts")
            
             dispatch({type: 'get_blogposts', payload: response1.data})
            

            //dispatch({type: 'edit_blogpost', payload: {newTitle: newTitle, newContent: newContent, id: id}})
            props.navigation.navigate('Show')
        }
    }
    
  
export const {Context, Provider} = createDataContext(
    blogReducer, {addBlogPost, deleteBlogPost,editBlogPost, getBlogPosts}, []  //blogReducer is the reducer, addBlogPost is the action and [] is the initial value of State
)








//  CREATING A CONTEXT WITHOUT USING TEMPLATE 

// const BlogContext = React.createContext()

// const blogReducer = (state, action) => {
    
//     switch (action.type){
//         case 'add_blogpost':
//             return [...state, {title: `Blog Post #${state.length + 1}`}]
//         default:
//             return state
//     }
// }

// export const BlogProvider = (props) => {  // we did not use export default because we will still export or BlogContext
    
//     //const [blogPosts, setBlogPosts] = useState([])
    
//     // const addBlogPost = () => {
//     //     setBlogPosts([...blogPosts, {title: `Blog Post #${blogPosts.length + 1}`}])
//     // } 
//     // we can use the above code also to update the state by passing the addBlogPost function to the child
//     // such that when the function is invoked/called in the child, the state here will be updated.
//     // we can also have other functions like editBlog, deleteBlog in similar way we created the commented addBlogPost function
//     // we then pass the functions to the child. when any of the functions is invoked in the child component, the state here get updated
//     // BUT WE WANT TO USE REDUCER INSTEAD


    
//     const [blogPosts, dispatch] = useReducer(blogReducer, [])
//     // note that blogPosts can be replaced with state

//     const addBlogPost = () => {
//         dispatch({type: 'add_blogpost'})
//     }
    
//     return (
//     <BlogContext.Provider value={{data: blogPosts, addBlogPost: addBlogPost}}>
//         {props.children}
//     </BlogContext.Provider>
//     )
        
// }
// export default BlogContext