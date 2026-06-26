import './Card.css';

const Card = ({ title, excerpt, imageUrl, date, role, bio }) => {
  return (
    <div className="card">
      {imageUrl && (
        <div className="card-image-wrapper">
          <img src={imageUrl} alt={title} className="card-image" />
        </div>
      )}
      <div className="card-content">
        {date && <span className="card-meta">{date}</span>}
        {role && <span className="card-meta role">{role}</span>}
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{excerpt || bio}</p>
        <button className="btn btn-outline card-btn">Read More</button>
      </div>
    </div>
  );
};

export default Card;
