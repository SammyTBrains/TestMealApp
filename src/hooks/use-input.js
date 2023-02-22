import { useReducer } from "react";

const defaultInputState = {
  value: "",
  isTouched: false,
};

const inputReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }

  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }

  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }
};

const useInput = (validateValue) => {
  const [inputState, dispatchInputAction] = useReducer(
    inputReducer,
    defaultInputState
  );

  const enteredValueIsValid = validateValue(inputState.value);
  const enteredInputIsInvalid = !enteredValueIsValid && inputState.isTouched;

  const valueInputChangeHandler = (event) => {
    dispatchInputAction({ type: "INPUT", value: event.target.value });
  };

  const valueInputBlurHandler = (event) => {
    dispatchInputAction({ type: "BLUR" });
  };

  const reset = () => {
    dispatchInputAction({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: enteredValueIsValid,
    enteredInputIsInvalid, //key value shortcut for objects with same key and value name in javascript
    valueInputChangeHandler,
    valueInputBlurHandler,
    reset,
  };
};

export default useInput;
