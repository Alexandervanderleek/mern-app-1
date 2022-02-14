import React, {useState, useContext} from "react";
import Card from "../../shared/components/UIelements/Card";
import Button from "../../shared/components/formElements/Button"
import Modal from "../../shared/components/UIelements/Modal";
import Map from "../../shared/components/UIelements/map";
import { AuthContext } from '../../shared/context/auth-context';

import './PlaceItem.css'

const PlaceItem = (props) =>{
    const [showMap, setShowMap] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const auth = useContext(AuthContext);

    const openMapHandler = ()=>{
        setShowMap(true);
    }

    const closeMapHandler = ()=>{
        setShowMap(false);
    }

    const showDeleteWarningHandler = () =>{
        setShowConfirm(true);
    }

    const cancelDeleteHandler = () =>{
        setShowConfirm(false);
    }

    const confirmDeleteHandler = () =>{
        setShowConfirm(false);
        console.log("yessir")
    }


    return ( <React.Fragment>
        <Modal show={showMap} 
        onCancel={closeMapHandler} 
        header={props.address} 
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE </Button>}>
            <div className="map-container">
                
                <Map center={props.coordinates} zoom={16}></Map>
            </div>
        </Modal>
        <Modal
        show={showConfirm}
        onCancel={cancelDeleteHandler} 

        header="are you sure"
        footerClass="place-item__modal-actions"
        footer={
            <React.Fragment>
                <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
            </React.Fragment>
        }>
            <p>Do you want to delete</p>
        </Modal>
    <li className="place-item">
        <Card className="place-item__content">
        <div className="place-item__image">
            <img src={props.image} alt={props.title}></img>
        </div>

        <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>

        </div>

        <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}> View of map</Button>
            {auth.isLoggedIn && <Button to ={`/places/${props.id}`}>Edit</Button>}
            {auth.isLoggedIn &&<Button danger onClick={showDeleteWarningHandler}>Delete</Button>}
        </div>
        </Card>
    </li>
    </React.Fragment>)
}

export default PlaceItem;