import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import Modal from "../utilities/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import WrapperButton from "../utilities/WrapperButton";
import ButtonClose from "../utilities/ButtonClose";
import { ColorModeContext } from "../../context/ColorModeContext";

const Cart = ({ onClose, onShowFinal }) => {
  const { itemsCart, updateAmount, removeItem, removeAll } =
    useContext(CartContext);

  const listItemsCart = itemsCart.items.map((item) => (
    <CartItem
      key={item.name}
      name={item.name}
      price={item.price}
      img={item.img}
      amount={item.amount}
      updateAmount={updateAmount}
      removeItem={removeItem}
    />
  ));

  const showFinalModalHandler = () => {
    onClose();
    removeAll();
    onShowFinal();
  };

  const { isDarkMode } = useContext(ColorModeContext);

  // Calcula el IVA y el total aquí
  const IVA_RATE = 0.13; // Tasa de IVA del 13%
  const subtotal = Number(itemsCart.total);
  const iva = subtotal * IVA_RATE;
  const total = subtotal + iva;

  return (
    <Modal onClose={onClose} isDarkMode={isDarkMode}>
      <div className={classes.header}>
        <p>Tu carrito</p>
        <button onClick={removeAll}>Eliminar mi compra</button>
      </div>
      <ul className={classes.cartList}>
        {itemsCart.items.length ? listItemsCart : <p className={classes.noItems}>No hay artículos en su carrito de compras.</p>}
      </ul>
      {itemsCart.items.length ? (
  <div className={classes.totalContainer}>
    <div className={classes.totals}>
      <p>Sub-Total: <span>$ {subtotal.toFixed(2)}</span></p>
      <p>IVA (13%): <span>$ {iva.toFixed(2)}</span></p>
      <p>Total: <span>$ {total.toFixed(2)}</span></p>
    </div>
    <WrapperButton onClick={showFinalModalHandler}>
      Finalizar compra
    </WrapperButton>
  </div>
) : null}
      <ButtonClose onClose={onClose} />
    </Modal>
  );
};

export default Cart;
