import React from "react";
import PlaceList from '../components/PlaceList';
import { useParams } from "react-router-dom";

const dummy = [
    {
       id: 'p1',
       title: 'place test',
       description: 'a cool place to go',
       imageUrl: 'https://i.imgur.com/MprxT1s.jpeg',
       address: '2a rugby',
       location:{
           lat: 40.7484405,
           lng: -73.9878584
       },
       creator: 'u1'
    },
    {
        id: 'p1',
        title: 'place test 2',
        description: 'also cool place to go',
        imageUrl: 'https://i.imgur.com/MprxT1s.jpeg',
        address: '2a rugby',
        location:{
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    }
     
]

const UserPlaces =()=>{
    const userId = useParams().userId;
    const loadedPlaces = dummy.filter(place => place.creator === userId);
    return(
        <PlaceList items={loadedPlaces}></PlaceList>
    )
}

export default UserPlaces;