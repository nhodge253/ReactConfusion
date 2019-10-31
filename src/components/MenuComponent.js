import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

    function RenderMenuItem({ dish, onClick}) {
        return (
            <Card></Card>
        );
    }
    const Menu = (props) => {
        const menu = props.dishes.map((dish) => { 
            return (
                <div className="col-12 col-md-5 m-1" key={dish.id}>
                    <RenderMenuItem dish={dish}/>
              </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }


export default Menu;