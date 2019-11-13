import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle,
    Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody, Col, Row, Label
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {

        return ((props.dish)
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
                    <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id} />
                </div>
            </div>
            : <div></div>);

    }
}

function RenderDish({ dish }) {
    return <div className="col-sm-12 col-md-5 m-1">
        <FadeTransform in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    </div>
}

function RenderComments({ comments, postComment, dishId }) {
    return (comments) ? <div className="col-sm-12 col-md-5 m-1" id="commentslist">
        <h4 className="offset-md-1">Comments</h4>
        <ul>
            <Stagger in>
                {comments.map((comment) => {
                    return (
                        <Fade in>
                            <li key={comment.id}><i>"{comment.comment}"</i><br />{comment.author},
                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format
                                    (new Date(Date.parse(comment.date)))}</li>
                        </Fade>/*new Intl.DateTimeFormat snippet after comment.author and in front of 
                        comment.date shortens the date to readable format*/
                    );
                })}
            </Stagger>
        </ul>
        <CommentForm dishId={dishId} postComment={postComment} />
    </div> : <div></div>;
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(
            this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {

        return (
            <div>
                <Button color='secondary' className="offset-md-1" outline onClick={this.toggleModal}>
                    <i className='fa fa-pencil'></i> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment
        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">

                                    <Col md={12}>
                                        <Label htmlFor="author" >Your Name</Label>
                                        <Control.text model=".author" id="author" name="author"
                                            placeholder="Enter name here."
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <Label htmlFor=".rating" >Rate Your Meal</Label>

                                        <Control.select
                                            model=".rating"
                                            id="rating" name="rating"
                                            className="form-control"
                                            defaultValue={5}
                                        >
                                            <option value="5">5</option>
                                            <option value="4">4</option>
                                            <option value="3">3</option>
                                            <option value="2">2</option>
                                            <option value="1">1</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor=".comment">Your Comment</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".comment" id="comment" name="comment"
                                            rows="6"
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{ size: 10, offset: 2 }}>
                                        <Button type="submit" color="primary">
                                            Send Feedback
                                    </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </ModalHeader>
                </Modal>
            </div>
        );

    }
}

export default DishDetail;

