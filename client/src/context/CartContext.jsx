import { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cartItems'));
        if (storedCart) {
            setCartItems(storedCart);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((i) => i._id === item._id);
            if (existingItem) {
                return prevItems.map((i) =>
                    i._id === item._id ? { ...i, qty: i.qty + 1 } : i
                );
            } else {
                return [...prevItems, { ...item, qty: 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((i) => i._id !== id));
    };

    const updateQty = (id, qty) => {
        setCartItems((prevItems) =>
            prevItems.map((i) => (i._id === id ? { ...i, qty: Math.max(1, qty) } : i))
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const totalAmount = cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQty,
                clearCart,
                totalAmount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
