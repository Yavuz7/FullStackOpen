import { useSelector } from "react-redux";

const Notification = () => {
  const notif = useSelector((state) => state.notifications);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  if (notif.length > 0) {
    return <div style={style}>{notif}</div>;
  }
};

export default Notification;
