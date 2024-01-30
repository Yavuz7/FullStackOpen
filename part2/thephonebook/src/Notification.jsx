// Code From FullstackOpen Part 2e
const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="notification">{message}</div>;
};

export default Notification;
