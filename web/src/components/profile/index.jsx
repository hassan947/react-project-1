import axios from 'axios';

import { Formik, Field, Form, useFormik } from "formik";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { baseUrl } from "./../../core"

const validationSchema = yup.object({
    name: yup
        .string('Enter your name')
        .required('Name is required'),
});




function Profile() {
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            name: '',
        },
        onSubmit: function (values) {
            
            axios.post(`${baseUrl}/api/v1/profile`, {
                name: values.name
            })
                .then((res) => {
                    console.log("res: ", res.data);
                })
        }
    });
    return (
        <div style={{ margin: "2rem" }}>
            <h1>Profile</h1>

            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>

                    <TextField
                        fullWidth
                        color="primary"
                        id="outlined-basic"
                        label="Write Post"
                        variant="outlined"

                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}

                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />

                    
                    <Button fullWidth variant="contained" color="primary" type="submit">Add-Post</Button>
                </Stack>

            </form>

        </div>
    );
}

export default Profile;