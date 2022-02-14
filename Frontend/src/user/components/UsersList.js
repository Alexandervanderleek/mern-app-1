import React from "react";
import UserItem from "./UserItem";
import Card from "../../shared/components/UIelements/Card";

import './UserList.css'

const UserList = (props) =>{

    console.log(props.items)

    if(props.items.length === 0){
        return (
            <div className="center">
                <Card>
                <h2>No user found</h2>
                </Card>
            </div>
        )
    }

    return (
        <ul className="users-list">
          {
              props.items.map( user =>{
                  console.log(user);
                  return(
                    <UserItem 
                    key={user.id} 
                    id={user.id} 
                    image={user.image} 
                    name={user.name} 
                    placeCount={user.places.length}>

                    </UserItem>
                  )
              })
          }  
        </ul>
    )
}

export default UserList;