import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import {Header, Airbnb, Icon } from "react-native-elements";
import {RfValue} from "react-native-responsive-fontsize";
import axios from "axios";

export default class HomeScreen extends Componenet{
    constructor(){
        super();
        this.state = {
            movieDetails: {
                
            }
        };
    }

    ComponenetDidMount(){
        this.getMovie();
    } 
    timeConvert(num){
        var hours = Math.floor(num/60);
        var minutes = num % 60;
        return `${hours}hrs ${minutes}mins`;  
    }  
    
    getMovie = () => {
        const url = "https://localhost:5000/get-movie";
        axios
        .get(url)
        .then(response =>{
            let details = response.data.data;
            details["duration"] = this.timeConvert(details.duration);
            this.state({movieDetails: details});
        })
        .catch(error => {
            console.log(error.message);
        });
    };

    likedMovie = () => {
        const url = "https://localhost:5000/liked-movie";
        axios
        .get(url)
        .then(response =>{
            this.getMovie();
        })
        .catch(error =>{
            console.log(error.message);
        });
    };

    unlikedMovie = () =>{
        const url = "https://localhost:5000/unliked-movie";
        axios
        .post(url)
        .then(response =>{
            this.getMovie();
        })
        .catch(error =>{
            console.log(error.message);
        });
    };

    notWatched = () => {
        const url = "https://localhost:5000/did-not-watch"
        axios
        .post(url)
        .then(response =>{
            this.getMovie();
        })
        .catch(error =>{
            console.log(error.message);
        });
    };

    render(){
        const {movieDetails} = this.state;
        if(movieDetails.poster_link){
            const {
                poster_link,
                title,
                release_date,
                duration,
                overview,
                rating,
                
            } = movieDetails;
            return(
                <View style= {styles.container}>

                    <View style= {styles.headerContainer}>
                        <Header
                            centerComponent = {{
                                text: "Movie Recommended",
                                style: styles.headerTitle
                                
                            }}
                            rightComponent = {{
                                Icon: "search",
                                Color: "#ffffff",
                            }}
                            backgroundColor = {"#D500F9"}
                            containerStyle = {{flex: 1}}
                            />
                  </View>
                  <View style= {styles.subTopContainer}>
                    <Image style= {styles.posterImage} source = {{uri:poster_link}} />
                  </View>
                        <View style= {styles.subBottomContainer}>
                            <View style= {styles.upperBottomContainer}>
                                <Text style= {styles.title}> {Title}</Text>
                                <Text style= {styles.subTitle}></Text>
                            </View>
                        </View>
                </View>

            )
        }
    }

}