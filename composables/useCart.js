export const useCart = () => {
  const cart = useState("cart", () => {
    if (process.client) {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const save = () => {
    if (process.client) {
      localStorage.setItem("cart", JSON.stringify(cart.value));
    }
  };

  const addToCart = (item) => {
    if (!cart.value.find((i) => i.id === item.id)) {
      cart.value.push(item);
      save();
    }
  };

  const removeFromCart = (id) => {
    cart.value = cart.value.filter((i) => i.id !== id);
    save();
  };

  const isInCart = (id) => {
    return cart.value.some((i) => i.id === id);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    isInCart,
  };
};
