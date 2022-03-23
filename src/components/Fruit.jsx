import React, { Component } from 'react'
import './Fruit.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Fruit extends Component {
    constructor() {
        super();
        this.state = {
            showDesc: false,
            isConfirm: false
        }
    }

    confirmedOrder = () => {
        this.setState({ isConfirm: !this.state.isConfirm })
        let total = this.props.price * document.getElementById("quantity" + this.props.id).value
        let obj = { id: this.props.id, img: this.props.img, name: this.props.name, price: this.props.price, quantity: document.getElementById("quantity" + this.props.id).value, total: total }
        this.props.cart(obj)
        toast.info("Item added to cart!", {
            position: toast.POSITION.BOTTOM_CENTER,
            theme: "dark"
        });
    }

    render() {
        return (
            <>
                <div className="fruit">
                    <img onClick={() => this.setState({ showDesc: !this.state.showDesc })} src={this.props.img} alt="" />
                    <h2>{this.props.name}</h2>
                    <p>Rs.{this.props.price}</p>
                    <div className="btns">
                        <button onClick={() => { document.getElementById("quantity" + this.props.id).value = (+document.getElementById("quantity" + this.props.id).value) + 1 }}>+</button>
                        <input type="number" min="1" max="99" defaultValue="1" id={"quantity" + this.props.id} />
                        <button onClick={() => { document.getElementById("quantity" + this.props.id).value = (+document.getElementById("quantity" + this.props.id).value === 1) ? 1 : (+document.getElementById("quantity" + this.props.id).value) - 1 }}>-</button>
                    </div>
                    <button onClick={() => this.setState({ isConfirm: !this.state.isConfirm })}>Add to cart</button>
                </div>
                {
                    (this.state.isConfirm) ?
                        <div className="confirm">
                            <div className="box">
                                <p>Waiting for your confirmation!!</p>
                                <div className="btns">
                                    <button onClick={() => this.setState({ isConfirm: !this.state.isConfirm })}>Cancel</button>
                                    <button onClick={this.confirmedOrder}>Ok</button>
                                </div>
                            </div>
                        </div>
                        : ""
                }
                {(this.state.showDesc) ?
                    <div className="desc">
                        <div className="left">
                            <img src={this.props.img} alt="" />
                        </div>
                        <div className="right">
                            <h1>{this.props.name}</h1>
                            <p>{this.props.desc}</p>
                            <button onClick={() => this.setState({ showDesc: !this.state.showDesc })}>Back</button>
                        </div>
                    </div>
                    :
                    ""
                }
            </>
        )
    }
}