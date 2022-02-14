import React from "react";
import Card from "../../shared/components/UIelements/Card";
import PlaceItem from './PlaceItem';
import Button from "../../shared/components/formElements/Button";

import './PlaceList.css'

const PlaceList = (props) =>{
    if(props.items.length === 0){
        return(
            <div className="place-list center">
                <Card>
                    <h2>
                        No Places Found
                    </h2>
                    <Button to="/places/new">
                        share a place
                    </Button>
                </Card>
            </div>
        )
    }

    return (
        <ul className="place-list">
            {
                props.items.map(place => 
                    <PlaceItem
                     key={place.id} 
                     id ={place.id}
                     image = {place.imageUrl}
                     title = {place.title}
                     description = {place.description}
                     address = {place.address}
                     creatorId = {place.creator}
                     coordinates = {place.location}

                     ></PlaceItem>
                )
            }
        </ul>
    )
}

export default PlaceList;