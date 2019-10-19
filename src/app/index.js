import React from "react";
import { Provider } from "react-redux";
import Routes from "./routes";

import 'mapbox-gl/dist/mapbox-gl.css'
import "./app.css"


const App = () => (
//   <Provider store={store}>
    <Routes />
//   </Provider>
);

export default App;
