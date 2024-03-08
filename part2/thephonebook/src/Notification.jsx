// Code From FullstackOpen Part 2e

const Notification = ({ message, isError }) => {

  if (message === null) {
    return null;
  }
  return (
    <div className={`${isError ? "error" : "notification"}`}>{message}</div>
  );
};

export default Notification;
