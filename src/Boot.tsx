/* eslint-disable react/react-in-jsx-scope */
import { getPersistor } from "./redux/store";
import { Routes } from "./routes";
import { PersistGate } from "redux-persist/integration/react";


const Boot = () => {
  const persistor = getPersistor();
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Routes />
    </PersistGate>
  );
};

export default Boot;
