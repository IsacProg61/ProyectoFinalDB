// src/components/MenuCards.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./MenuCards.css";

const cards = [
  {
    id: "Cliente",
    title: "Menu para gestionar clientes",
    subtitle: "Cliente",
    description: "Gestion a clientes",
    button: "Clientes",
    colorClass: "card-top-red",
  },
  {
    id: "Servicios",
    title: "Gestión de Servicios",
    subtitle: "Servicios",
    description: "Gestiona los servicios: ver, agregar, actualizar, eliminar.",
    button: "Servicios",
    colorClass: "card-top-green",
  },
  {
    id: "Knowledge_Base",
    title: "Knowledge Base",
    subtitle: "Knowledge Base",
    description: "Knowledge Base para la gestión de servicios y clientes.",
    button: "Knowledge Base",
    colorClass: "card-top-blue",
  },
];

const MenuCards = () => {
  const navigate = useNavigate();

  const handleNavigation = (id) => {
    if (id === "Cliente") navigate("/cliente");
    else if (id === "Servicios") navigate("/servicios");
    else if (id === "Knowledge_Base") navigate("/knowledge-base");
  };

  return (
    <div className="card-container" >
      {cards.map((card) => (
        <div key={card.id} className="card">
          <div className={`card-top ${card.colorClass}`}></div>
          <div className="card-content">
            <h2 className="card-subtitle">{card.subtitle}</h2>
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
            <button className="card-button" onClick={() => handleNavigation(card.id)}>{card.button}</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuCards;