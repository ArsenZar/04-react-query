import { Formik, Form, Field } from "formik";

interface OrderFormValues {
  restrictions: string[];
}

const initialValues: OrderFormValues = {
  restrictions: [],
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
          <Field type="checkbox" name="restrictions" value="vegan" />
          Vegan
        </label>
        <label>
          <Field type="checkbox" name="restrictions" value="gluten-free" />
          Gluten-free
        </label>
        <label>
          <Field type="checkbox" name="restrictions" value="nut-free" />
          Nut-free
        </label>

        <button type="submit">Place order</button>
      </Form>
    </Formik>
  );
}
