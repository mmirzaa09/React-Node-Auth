import React from 'react'
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function CreatePost() {

    const initialValue = {
        title: "",
        postText: "",
        username: ""
    }

    const onSubmit = (data) => {
        axios.post('http://localhost:3001/posts', data).then((res) => {
            console.log('Work')
        })
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You mush input the title"),
        postText: Yup.string().required(),
        username:Yup.string().min(3).max(15).required() 
    })

    return (
        <div className="createPostPage">
            <Formik 
                initialValues={initialValue}
                onSubmit={onSubmit} 
                validationSchema={validationSchema}
            >
                <Form className="formContainer" >
                    <label>Tittle: </label>
                    <ErrorMessage name="title" component="span"/>
                    <Field 
                        autocomplete="off"
                        id="inputCreatePost" 
                        name="title" 
                        placeholder="(Ex. Title...)" 
                    />
                    <label>Post: </label>
                    <ErrorMessage name="postText" component="span"/>
                    <Field 
                        autocomplete="off"
                        id="inputCreatePost" 
                        name="postText" 
                        placeholder="(Ex. Post...)" 
                    />
                    <label>Username: </label>
                    <ErrorMessage name="username" component="span"/>
                    <Field 
                        autocomplete="off"
                        id="inputCreatePost" 
                        name="username" 
                        placeholder="(Ex. John..)" 
                    />
                    <button type="submit"> Create Post</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost