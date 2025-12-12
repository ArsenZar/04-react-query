import { Formik, Form, Field } from "formik";

export default function OrderForm() {
  return (
    <Formik
      initialValues={{
        username: "hello",
        email: ""
      }}
      onSubmit={() => { }}
    >
      <Form>
        <Field type="text" name="username" />
        <Field type="email" name="email" />
        <button type="submit">Place order</button>
      </Form>
    </Formik>
  );
}
