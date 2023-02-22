import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    enteredInputIsInvalid: nameInputIsInvalid,
    valueInputChangeHandler: nameInputChangeHandler,
    valueInputBlurHandler: nameInputBlurHandler,
    reset: resetNameProperties,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    enteredInputIsInvalid: streetInputIsInvalid,
    valueInputChangeHandler: streetInputChangeHandler,
    valueInputBlurHandler: streetInputBlurHandler,
    reset: resetStreetProperties,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPostal,
    isValid: enteredPostalIsValid,
    enteredInputIsInvalid: postalInputIsInvalid,
    valueInputChangeHandler: postalInputChangeHandler,
    valueInputBlurHandler: postalInputBlurHandler,
    reset: resetPostalProperties,
  } = useInput((value) => value.length < 6 && value.length > 0);

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    enteredInputIsInvalid: cityInputIsInvalid,
    valueInputChangeHandler: cityInputChangeHandler,
    valueInputBlurHandler: cityInputBlurHandler,
    reset: resetCityProperties,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredPostalIsValid &&
    enteredCityIsValid
  ) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log(enteredName, enteredStreet, enteredPostal, enteredCity);

    resetNameProperties();
    resetStreetProperties();
    resetPostalProperties();
    resetCityProperties();
  };

  const settingInputClass = (inputIsInvalid) =>
    inputIsInvalid ? classes.invalid : "";

  const nameInputClasses = settingInputClass(nameInputIsInvalid);
  const streetInputClasses = settingInputClass(streetInputIsInvalid);
  const postalInputClasses = settingInputClass(postalInputIsInvalid);
  const cityInputClasses = settingInputClass(cityInputIsInvalid);

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control + " " + nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className={classes["error-text"]}>Name must not be empty.</p>
        )}
      </div>
      <div className={classes.control + " " + streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetInputChangeHandler}
          onBlur={streetInputBlurHandler}
          value={enteredStreet}
        />
        {streetInputIsInvalid && (
          <p className={classes["error-text"]}>Street must not be empty.</p>
        )}
      </div>
      <div className={classes.control + " " + postalInputClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={postalInputChangeHandler}
          onBlur={postalInputBlurHandler}
          value={enteredPostal}
        />
        {postalInputIsInvalid && (
          <p className={classes["error-text"]}>
            Enter valid postal number (1-5).
          </p>
        )}
      </div>
      <div className={classes.control + " " + cityInputClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityInputChangeHandler}
          onBlur={cityInputBlurHandler}
          value={enteredCity}
        />
        {cityInputIsInvalid && (
          <p className={classes["error-text"]}>City must not be empty.</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!formIsValid} className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
