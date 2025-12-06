/* eslint-disable @typescript-eslint/no-explicit-any */
import { act } from "react-dom/test-utils";

export const resetZustand = (store: any) => {
  act(() => {
    store.setState(store.getInitialState());
  });
};
