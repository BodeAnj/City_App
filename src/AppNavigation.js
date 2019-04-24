import {createStackNavigator, createAppContainer} from 'react-navigation'
import Home from './Screens/Home'
import Cities from './Screens/Cities'

const AppNavigator = createStackNavigator({

    Home : {screen:Home},

    Cities:{screen:Cities,
    
        
    }
})
 
export default createAppContainer(AppNavigator)