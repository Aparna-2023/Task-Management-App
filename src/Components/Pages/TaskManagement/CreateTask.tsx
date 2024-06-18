import { Formik, Field, Form, ErrorMessage } from "formik";
import { TaskInitialValues, TaskValidationSchema } from "./CreateTaskMethods";
import { Button, Col, FormGroup, Label } from "reactstrap";
import { CreateTaskProps, Task } from "../../Lib/Types";
import Select from "react-select";

export const CreateTask: React.FC<CreateTaskProps> = ({ addTask }) => {

  const options = [
    { value: "Todo", label: "Todo" },
    { value: "Doing", label: "Doing" },
    { value: "Done", label: "Done" },
  ];

  return (
    <div className="form-outer-wrap">
      <Formik
        initialValues={TaskInitialValues}
        validationSchema={TaskValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const newTask: Task = {
            id: Date.now(),
            ...values,
          };
          addTask(newTask);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ setFieldValue, handleChange }) => {
          return (
            <Form>
              <FormGroup row>
                <Label htmlFor="title" md={3} className="text-white">
                  Title
                </Label>
                <Col md={9}>
                  <Field
                    name="title"
                    type="text"
                    onChange={handleChange}
                    className="w-100 bg-white text-dark form-control"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-danger"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="description" md={3} className="text-white">
                  Description
                </Label>
                <Col md={9}>
                  <Field
                    name="description"
                    type="text"
                    onChange={handleChange}
                    className="w-100 bg-white text-dark form-control"
                    as="textarea"
                    rows={4}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-danger"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="status" md={3} className="text-white">
                  Status
                </Label>
                <Col md={9}>
                  <Select
                    options={options}
                    placeholder="Select Status"
                    onChange={(e: any) => {
                      setFieldValue("status", e?.value);
                    }}
                    name="status"
                    
                  />
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="text-danger"
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Button type="submit" className="btn btn-info text-light">
                  Submit
                </Button>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
