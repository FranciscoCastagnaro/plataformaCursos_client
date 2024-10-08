import './styles/useropinioncard.css'

export const UserOpionionCard = ({ username, opinion, photo }) => {
  return (
    <div className="user_opinion_card">
      <img src={photo} alt="opinion user photo" />
      <div className="user_opinion_text">
        <h4>{username}</h4>
        <p>{`"${opinion}"`}</p>
      </div>
    </div>
  );
};
