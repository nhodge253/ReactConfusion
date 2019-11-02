import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle,
Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';

    const DishDetail = (props) => {
        const { dish } = props;
        return (dish) 
        ? <div className="container">
            <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} />
                </div>
          </div>
        :<div></div>;
    }

    function RenderDish({dish}) {
        return <div className="col-sm-12 col-md-5 m-1">
            <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
            </Card>
        </div>
    }

    function RenderComments({comments}) {
        return (comments)? <div className="col-sm-12 col-md-5 m-1">
            <h4>Comments</h4>
            <ul>
                {comments.map((comment) => {
                    return (
                        <li key={comment.id}><i>"{comment.comment}"</i><br />{comment.author}, 
                        {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day:'2-digit'}).format
                        (new Date(Date.parse(comment.date)))}</li>/*this part after comment.author and in front of 
                        comment.date shortens the date to readable format*/
                    );
                })}
            </ul>
        </div> : <div></div>;
    }

export default DishDetail;

