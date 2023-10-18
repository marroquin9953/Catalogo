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

  return (
    <Modal onClose={onClose} isDarkMode={isDarkMode}>
      <div className={classes.header}>
        <p>Tu carrito</p>
        <button onClick={removeAll}>Carro vacio</button>
      </div>
      <ul className={classes.cartList}>
        {itemsCart.items.length ? (
          listItemsCart
        ) : (
          <p className={classes.noItems}>No hay artículos en su carrito de compras.</p>
        )}
      </ul>
      {itemsCart.items.length ? (
        <div className={classes.total}>
          <p>
            Sub-Total: <span>$ {Number(itemsCart.total).toFixed(2)}</span>
          </p>
          <WrapperButton onClick={showFinalModalHandler}>
            Finalizar compra
          </WrapperButton>
        </div>
      ) : (
        ""
      )}
      <ButtonClose onClose={onClose} />
    </Modal>
  );
};

export default Cart;
