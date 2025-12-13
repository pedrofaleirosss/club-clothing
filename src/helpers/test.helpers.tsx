import { configureStore } from "@reduxjs/toolkit";
import React, { ReactNode } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import rootReducer from "../store/root-reducer";
import { RootState } from "../store/store";

export const renderWithRedux = (
  component: React.ReactElement,
  {
    preloadedState,
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  }: {
    preloadedState: RootState;
    store: any;
  }
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    );
  };

  return render(component, { wrapper: Wrapper, ...renderOptions });
};
