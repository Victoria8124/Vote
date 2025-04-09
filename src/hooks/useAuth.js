// src/hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Хук для использования контекста в компонентах
export const useAuth = () => {
  return useContext(AuthContext); // Возвращаем значение контекста
};
