const Button = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          {children}
          <button className="close-btn" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    );
  };
  
  export default Button;