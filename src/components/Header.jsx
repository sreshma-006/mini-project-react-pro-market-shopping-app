import React, { Component } from 'react'
import './Header.css'
import { MdShoppingCart } from "react-icons/md";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Header extends Component {
    constructor() {
        super();
        this.state = {
            showCart: false,
            total: 0
        }
    }

    remFromCart = () => {
        this.setState({ showCart: !this.state.showCart })
        this.props.remItems([])
        toast.success("Order has been placed!", {
            position: toast.POSITION.BOTTOM_CENTER,
            theme: "dark"
        });
    }

    render() {
        return (
            <>
                <div className="header">
                    <h1>ProMarket</h1>
                    <span className="cart-item">{this.props.cartItems.length}</span>
                    <button onClick={() => this.setState({ showCart: !this.state.showCart })}><MdShoppingCart /></button>
                </div>
                {
                    (this.state.showCart) ?
                        <div className="cart-cont">
                            <div className="cart">
                                <h2>Cart</h2>
                                <hr />
                                {
                                    this.props.cartItems.map((item) => {
                                        return <div className="item" key={item.id}>
                                            <img src={item.img} alt="" />
                                            <p>{item.name}</p>
                                            <p>Rs.{item.price}</p>
                                            <p className="quant">{item.quantity}</p>
                                        </div>
                                    })
                                }
                                <hr />
                                <p>Total:Rs {
                                    (this.props.cartItems.length === 0) ?
                                        "0" :
                                        this.props.cartItems.map((item) => {
                                            return item.total
                                        }).reduce((a, b) => a + b)
                                }</p>
                                <div className="btns">
                                    <button onClick={() => this.setState({ showCart: !this.state.showCart })}>Cancel</button>
                                    <button onClick={this.remFromCart}>Buy now</button>
                                </div>
                            </div>
                        </div>
                        : ""

                }
            </>
        )
    }
}