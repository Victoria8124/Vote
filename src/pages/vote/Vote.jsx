import styles from "./Vote.module.scss";
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { sendVote } from "../../services/voteService";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal/Modal";

const Vote = () => {
  const { auth } = useAuth(); 
  const [selectedOptions, setSelectedOptions] = useState("");
  const [otherText, setOtherText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth) {
      navigate("/login");
      return;
    }

    if (!selectedOptions) {
      setFormError("Пожалуйста, выберите вариант ответа");
      return;
    }

    try {
      await sendVote({
        roles: selectedOptions,
        other: otherText,
      });
      setFormError(""); 
    } catch (err) {
      console.error("Ошибка при отправке:", err);
      setShowModal(true);
    }
  };

  return (
    <div className={styles.voteContainer}>
      <h2>Ваша роль в компании?</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="radio"
            name="role"
            value="Frontend разработчик"
            checked={selectedOptions === "Frontend разработчик"}
            onChange={(e) => {
              setSelectedOptions(e.target.value);
              setFormError("");
            }}
          />
          Frontend разработчик
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="Backend разработчик"
            checked={selectedOptions === "Backend разработчик"}
            onChange={(e) => {
              setSelectedOptions(e.target.value);
              setFormError("");
            }}
          />
          Backend разработчик
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="Что-то другое"
            checked={selectedOptions === "Что-то другое"}
            onChange={(e) => {
              setSelectedOptions(e.target.value);
              setFormError("");
            }}
          />
          Что-то другое
        </label>

        {selectedOptions === "Что-то другое" && (
          <input
            type="text"
            placeholder="Уточните..."
            onChange={(e) => setOtherText(e.target.value)}
            required
          />
        )}

        <button type="submit">Отправить</button>
      </form>
      {formError && <p className={styles.error}>{formError}</p>}
      {showModal && <Modal onClose={() => setShowModal(false)}></Modal>}
    </div>
  );
};

export default Vote;