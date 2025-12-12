import { useId } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";

interface OrderFormValues {
  username: string;
  email: string;
  deliveryTime: string;
}

const initialValues: OrderFormValues = {
  username: "",
  email: "",
  deliveryTime: "",
};

export default function OrderForm() {
  const fieldId = useId();

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
        <Field type="text" name="username" />
        <Field type="email" name="email" />

        <label htmlFor={`${fieldId}-deliveryTime`}>Preferred delivery time</label>
        <Field as="select" name="deliveryTime" id={`${fieldId}-deliveryTime`}>
          <option value="">-- Choose delivery time --</option>
          <option value="morning">Morning (8:00–12:00)</option>
          <option value="afternoon">Afternoon (12:00–16:00)</option>
          <option value="evening">Evening (16:00–20:00)</option>
        </Field>

        <button type="submit">Place order</button>
      </Form>
    </Formik>
  );
}
