import React,{Component} from 'react'
import {Text, View, Picker, StyleSheet, TextInput, Image, Button, FlatList, Platform} from 'react-native';
import axios from 'axios';
import SearchBar from 'react-native-material-design-searchbar'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons' 


export default class Cities extends Component{

    state ={
        cities : [],
        citiesBackup: [],
        selectedItem: ''
    }

    componentWillMount(){
        axios.get('http://opentable.herokuapp.com/api/cities')
        .then(response => {console.log(response.data.cities); this.setState({cities: response.data.cities, citiesBackup: response.data.cities})})
    }


    async navigateBack(item){
        await this.setState({selectedItem: item.item})
        await this.props.navigation.state.params.returnCity( this.state.selectedItem);
        this.props.navigation.goBack();
      }
    // async onSelection(item){
    //     await this.setState({selectedItem: item.item})
    //     this.navigateBack()
    // }

    renderCities = (item) => {
        console.log(item)
        return(
            <TouchableOpacity
            onPress = {() => {console.log(this.state.selectedItem); this.navigateBack(item)}}
            >
            <View >
            <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style= {Style.content}>{item.item}</Text>
                {this.state.selectedItem == item.index? 
                <Icon name="check" size={20} color='rgb(6,126,255)' /> 
                :null}
             </View>
            </View>
            </TouchableOpacity>
                
       

       )
    }

///////////////NAVIGATIONAL OPTIONS


static navigationOptions = () => {
    return{
        title : 'Cities',
        
        headerStyle:{
            backgroundColor: '#007aff',
        },
        headerTitleStyle:{
            color:'white',
        },
        
        headerBackTitleStyle:{
            color: 'white',
            
        },
        

    }
}    


searchItem(searchText) {
    if (searchText == '') {
      this.setState({ cities: [...this.state.citiesBackup], searchtext: searchText });
    } else {
      let temp = [];
      let data = this.state.citiesBackup;
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        var searchString = (data[i]).toLowerCase();
        if (searchString.trim().search(searchText.trim().toLowerCase()) > -1) {
          temp.push(data[i]);
        }
      }
      this.setState({ cities: [...temp], searchtext: searchText });
    }
  }
  

    render(){
        return(
            <View>
                <SearchBar
            onSearchChange={(text) => this.searchItem(text)}
            height={30}
            onFocus={() => console.log('On Focus')}
            onBlur={() => console.log('On Blur')}
            placeholder={'Search City...'}
            inputStyle={{ borderRadius: 5, height: (Platform.OS === 'android') ? 40 : 60, backgroundColor: '#fff', borderColor: 'transparent', width: 350}}
            returnKeyType={'search'}
          />

                <FlatList
                data={this.state.cities}
                renderItem={this.renderCities}
                extraData={this.state}
                />
            </View>
        )
    }
}

const Style = StyleSheet.create({

    content:{
        fontWeight: '200',
        fontSize : 25,
    }
})