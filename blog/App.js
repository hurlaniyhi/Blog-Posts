import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from "./src/screens/IndexScreen";
import {Provider} from "./src/context/BlogContext"  // we use {} because we did not export BlogProvider component using export default
import ShowBlog from "./src/screens/ShowBlogScreen"
import CreateBlog from "./src/screens/CreateScreen"
import EditBlog from "./src/screens/EditScreen"

const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Show: ShowBlog,
    Create: CreateBlog,
    Edit: EditBlog
  },
  {
    initialRouteName: "Index",
    defaultNavigationOptions: {
      title: "Blog",
      headerTitleStyle: {
        color: "white",
        textAlign: "center"
      },
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#003E87"
      }
    }
  }
);

const App = createAppContainer(navigator);

export default () => {
  return ( 
    <Provider>
      <App />
    </Provider>
  )
}

