import { Formik, Form, Field, FormikHelpers } from "formik";

interface OrderFormValues {
  message: string;
}

const initialValues: OrderFormValues = {
  message: "",
};

export default function OrderForm() {
  const handleSubmit = (
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>
  ) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <label htmlFor="message">Comment or instructions</label>
        <Field as="textarea" name="message" id="message" rows={5} />

        <button type="submit">Place order</button>
      </Form>
    </Formik>
  );
}
