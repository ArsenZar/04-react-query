import { Formik, Form, Field } from "formik";

interface OrderFormValues {
  delivery: string;
}

const initialValues: OrderFormValues = {
  delivery: "pickup",
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
        <label>
          <Field type="radio" name="delivery" value="pickup" />
          Pickup
        </label>
        <label>
          <Field type="radio" name="delivery" value="courier" />
          Courier
        </label>
        <label>
          <Field type="radio" name="delivery" value="drone" />
          Drone delivery
        </label>

        <button type="submit">Place order</button>
      </Form>
    </Formik>
  );
}
