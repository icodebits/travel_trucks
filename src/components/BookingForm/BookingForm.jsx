import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // For form validation
import styles from "./BookingForm.module.css";

import ReactDatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import "react-datepicker/dist/react-datepicker.css";
import "./customReactDatePicker.css";

// Register the locale for use in react-datepicker
registerLocale("en-GB", enGB);

const BookingForm = () => {
  // State to control the popup visibility
  const [showPopup, setShowPopup] = useState(false);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    date: Yup.date().required("Booking date is required"),
    comment: Yup.string(),
  });

  // Initial values for the form
  const initialValues = {
    name: "",
    email: "",
    date: "",
    comment: "",
  };

  // Handle form submission
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(values); // Replace with your submission logic
    setSubmitting(false);
    resetForm();

    // Show the popup message
    setShowPopup(true);

    // Hide the popup after 5 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  };

  return (
    <div className={styles.bookingFormContainer}>
      <div className={styles.formHeader}>
        <h3 className={styles.formHeaderTitle}>Book your campervan now</h3>
        <p className={styles.formHeaderDescription}>
          Stay connected! We are always ready to help you.
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form className={styles.bookingForm}>
            {/* Name Field */}
            <div>
              <Field
                type="text"
                name="name"
                placeholder="Name*"
                className={styles.formField}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.errorMessage}
              />
            </div>

            {/* Email Field */}
            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email*"
                className={styles.formField}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.errorMessage}
              />
            </div>

            {/* Custom Date Picker with Placeholder */}
            <div>
              <ReactDatePicker
                selected={values.date}
                onChange={(date) => setFieldValue("date", date)}
                placeholderText="Booking date*"
                className={styles.formField}
                calendarClassName="custom-calendar"
                locale="en-GB" // Set locale to en-GB (Monday start)
                dateFormat="dd/MM/yyyy" // Customize date format (optional)
                formatWeekDay={(day) => {
                  return day.slice(0, 3).toUpperCase();
                }}
                minDate={new Date()}
              />
              <ErrorMessage
                name="date"
                component="div"
                className={styles.errorMessage}
              />
            </div>

            {/* Comment Field */}
            <div>
              <Field
                as="textarea"
                name="comment"
                placeholder="Comment"
                className={styles.formField}
              />
              <ErrorMessage
                name="comment"
                component="div"
                className={styles.errorMessage}
              />
            </div>

            {/* Submit Button */}
            <div className={styles.submitButton}>
              <button type="submit" disabled={isSubmitting}>
                Send
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {/* Conditionally render the popup message */}
      {showPopup && (
        <div className={styles.popupMessage}>
          <p className={styles.popupText}>Form submitted successfully!</p>
          <button onClick={() => setShowPopup(false)} className={styles.closeButton}>Close</button>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
