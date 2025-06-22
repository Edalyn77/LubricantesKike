import { useState } from "react";
import "../styles/whatsapp.css"; 

export default function Whatsapp() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const phoneNumber = "51969993030"; 

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://wa.me/${phoneNumber}?text=Hola,%20soy%20${encodeURIComponent(
      name
    )}.%20${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="whatsapp-container">
      {open && (
        <form className="whatsapp-form" onSubmit={handleSubmit}>
        
        <h2>Escríbenos</h2>
          <input
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Tu mensaje"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit">Enviar</button>
        </form>
      )}
      <button className="whatsapp-button" onClick={() => setOpen(!open)}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
        />
      </button>
    </div>
  );
}
