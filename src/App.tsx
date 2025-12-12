// Імпортуємо вбудований тип FormikHelpers
import { Formik, Form, Field } from "formik";
import type { FormikHelpers } from "formik";


interface OrderFormValues {
  username: string;
  email: string;
}

const initialValues: OrderFormValues = {
  username: "",
  email: "",
};

export default function OrderForm() {
  const handleSubmit = (
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>
  ) => {
    console.log("Order data:", values);
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <Field type="text" name="username" />
        <Field type="text" name="email" />
        <button type="submit">Place order</button>
      </Form>
    </Formik>
  );
}
