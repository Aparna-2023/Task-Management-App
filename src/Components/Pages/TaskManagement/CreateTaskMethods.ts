import * as Yup from "yup";

export const TaskValidationSchema = Yup.object().shape({
    title: Yup.string().required("Field is Required"),
    description: Yup.string().required("Field is Required"),
    status: Yup.string().required("Field is Required"),
})

export const TaskInitialValues = {
    title: "",
    description: "",
    status: ""
}