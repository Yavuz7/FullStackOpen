/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CLEAR":
      return "";
    case "CREATE":
      return `Anecdote ${action.payload} Created!`;
    case "VOTE":
      return `Anecdote ${action.payload} Voted For!`;
    case "ERROR":
      return `Error: ${action.payload}`;
    default:
      return "";
  }
};

const NotificationContext = createContext();

export const useNotificationValue = () => {
  const notificationAndValue = useContext(NotificationContext);
  return notificationAndValue[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
