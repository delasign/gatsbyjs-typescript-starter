import * as React from "react";

// This is the extra redux functionality
import store from "reduxFunctionality/index";
import { Provider } from "react-redux";

import CounterLayout from "../layouts/counter";

// markup
const IndexPage = () => {
  return (
    <Provider store={store}>
      <main>
        <CounterLayout />
      </main>
    </Provider>
  );
};

export default IndexPage;
