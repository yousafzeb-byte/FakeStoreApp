import React, { createContext, useContext, useReducer, useEffect } from "react";

// User Context
const UserContext = createContext();

// User Actions
const USER_ACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  UPDATE_PROFILE: "UPDATE_PROFILE",
  ADD_TO_WISHLIST: "ADD_TO_WISHLIST",
  REMOVE_FROM_WISHLIST: "REMOVE_FROM_WISHLIST",
  ADD_ORDER: "ADD_ORDER",
  LOAD_USER_DATA: "LOAD_USER_DATA",
};

// User Reducer
function userReducer(state, action) {
  switch (action.type) {
    case USER_ACTIONS.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case USER_ACTIONS.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case USER_ACTIONS.UPDATE_PROFILE:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    case USER_ACTIONS.ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };

    case USER_ACTIONS.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item.id !== action.payload.id
        ),
      };

    case USER_ACTIONS.ADD_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };

    case USER_ACTIONS.LOAD_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

// Initial State
const initialState = {
  isAuthenticated: false,
  user: null,
  wishlist: [],
  orders: [],
};

// Mock user data
const mockUsers = {
  "demo@luxury.com": {
    id: 1,
    email: "demo@luxury.com",
    name: "Alexandra Sterling",
    password: "demo123",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Madison Avenue",
      city: "New York",
      state: "NY",
      zip: "10016",
      country: "United States",
    },
    preferences: {
      newsletter: true,
      notifications: true,
      currency: "USD",
    },
  },
};

// User Provider Component
export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUserData = localStorage.getItem("luxury-user-data");
    if (savedUserData) {
      try {
        const userData = JSON.parse(savedUserData);
        dispatch({ type: USER_ACTIONS.LOAD_USER_DATA, payload: userData });
      } catch (error) {
        console.error("Error loading user data from localStorage:", error);
      }
    }
  }, []);

  // Save user data to localStorage when it changes
  useEffect(() => {
    const userData = {
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      wishlist: state.wishlist,
      orders: state.orders,
    };
    localStorage.setItem("luxury-user-data", JSON.stringify(userData));
  }, [state]);

  // User Actions
  const login = async (email, password) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user = mockUsers[email];
      if (user && user.password === password) {
        dispatch({
          type: USER_ACTIONS.LOGIN,
          payload: { ...user, password: undefined }, // Don't store password
        });
        return { success: true };
      } else {
        return { success: false, error: "Invalid email or password" };
      }
    } catch (error) {
      return { success: false, error: "Login failed. Please try again." };
    }
  };

  const logout = () => {
    dispatch({ type: USER_ACTIONS.LOGOUT });
    localStorage.removeItem("luxury-user-data");
  };

  const updateProfile = (updates) => {
    dispatch({
      type: USER_ACTIONS.UPDATE_PROFILE,
      payload: updates,
    });
  };

  const addToWishlist = (product) => {
    const isAlreadyInWishlist = state.wishlist.some(
      (item) => item.id === product.id
    );
    if (!isAlreadyInWishlist) {
      dispatch({
        type: USER_ACTIONS.ADD_TO_WISHLIST,
        payload: product,
      });
    }
  };

  const removeFromWishlist = (productId) => {
    dispatch({
      type: USER_ACTIONS.REMOVE_FROM_WISHLIST,
      payload: { id: productId },
    });
  };

  const addOrder = (orderData) => {
    const order = {
      id: Date.now().toString(),
      ...orderData,
      date: new Date().toISOString(),
      status: "confirmed",
    };
    dispatch({
      type: USER_ACTIONS.ADD_ORDER,
      payload: order,
    });
  };

  const isInWishlist = (productId) => {
    return state.wishlist.some((item) => item.id === productId);
  };

  const userValue = {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    wishlist: state.wishlist,
    orders: state.orders,
    login,
    logout,
    updateProfile,
    addToWishlist,
    removeFromWishlist,
    addOrder,
    isInWishlist,
  };

  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
}

// Custom Hook
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export default UserContext;
