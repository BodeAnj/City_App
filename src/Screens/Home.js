import React,{Component} from 'react'
import {Text, View, Picker, StyleSheet, TextInput, TouchableOpacity, Button, FlatList, Platform} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { filtersRequesting } from '../Redux/Action'



 class Home extends Component{

    /////////////AXIOS FETCHING DYNAMIC DATA
    state = {
        countries : [],
        selected: '',
        city: '',
        
    }
componentWillMount(){
   
    axios.get('http://opentable.herokuapp.com/api/countries')
    .then(response =>  {console.log(response.data.countries); this.setState( {countries: response.data.countries})})
}



returnCity(city) {
   console.log(city);
   this.setState({city: city})

   return(
       <Text>{city}</Text>
   )
  }

  SelectedContainer(){
    fetch('http://opentable.herokuapp.com/api/resturants', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // ‘device_type’: deviceType
            //‘Authorization’: ‘Basic ’+btoa(‘MyTownTVAdmin:@6e6HtN5’),
        },
        body: JSON.stringify({country: this.state.selected, city: this.state.city})
    })
        .then(response => response.json())
        .then((res) => {
                console.log(res)
            return res
        })
//    this.props.filtersRequesting({ country: this.state.selected, city: this.state.city})
  }
//////////////RENDER COUNTRIES

renderCountries = (item) => {
    // console.log(item)
        return(
            <View>
                    <Text>{item.item}</Text>
            </View>
        )
} 


///////////////NAVIGATIONAL OPTIONS


    static navigationOptions = () => {
        return{
            title : 'Home',
            headerBackTitle: 'Back',
            headerStyle:{
                backgroundColor: '#007aff',
            },
            headerTitleStyle:{
                color:'white',
            },
            headerTintColor:{
                color: 'white'
            }

        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        
    }


    render(){
        //  console.log(this.state.selected);
        return(
            <View>

            <Picker
                style={Style.picker}
                selectedValue={this.state.selected}
                onValueChange={(selected)=>{ console.log(selected)
                    this.setState({selected:selected
            })}}> 
                    {this.state.countries.map((item, index) => {
        return (<Picker.Item label={item} value={item} />)
            })}
            </Picker>

           

                <View style = {Style.button}>
                <Button
                    onPress={() => this.props.navigation.navigate('Cities', {  returnCity: this.returnCity.bind(this),})}
                    title="City Search"
                    color= {(Platform.OS == 'android') ? '#007aff' : '#fff'}
                    />  
                </View>
               <View style = {Style.display}>

                   <Text style = {Style.content}>
                         Your Country : {this.state.selected}
                   </Text>
                
                   <Text style = {Style.content}>
                        Your City : {this.state.city}
                   </Text>
               </View>
                <View style = {Style.button}>
                    <Button 
                    onPress={() => {this.SelectedContainer()}}
                    title= 'Submit Filter'
                    color= {(Platform.OS == 'android') ? '#007aff' : '#fff'}
                    />
                
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filters : state.Submit
    }
}
export default connect(mapStateToProps, { filtersRequesting })(Home)

const Style =StyleSheet.create({

    picker:{
        // backgroundColor: 'lightblue'

    },
    button:{
        borderWidth: 2,
        borderColor : '#007aff',
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#007aff',
        
    },

    content:{
        fontWeight: '300',
        fontSize : 20,
        color: '#007aff',
        padding: 5

        
    },

    display:{
        justifyContent : 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        
        borderWidth: 1,
        borderColor : '#007aff',
        
    },
})