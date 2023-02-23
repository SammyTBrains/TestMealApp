import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const [isLoading, error, submitOrder] = useHttp();

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const onSubmitOrderHandler = (userData) => {
    submitOrder(
      {
        url: "https://httptest-6e34c-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        method: "POST",
        body: {
          user: userData,
          orderedItems: cartCtx.items,
        },
      },
      (data) => {}
    );
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, { ...item, amount: 1 })}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  let checkoutContent = modalActions;

  if (isCheckout) {
    checkoutContent = (
      <Checkout onConfirm={onSubmitOrderHandler} onCancel={props.onHideCart} />
    );
  }

  if (error) {
    checkoutContent = <p className={classes["error-text"]}>{error}</p>;
  }

  if (isLoading) {
    checkoutContent = <p>Loading...</p>;
  }

  return (
    <Modal onClose={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkoutContent}
    </Modal>
  );
};

export default Cart;
