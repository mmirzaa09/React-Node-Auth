import React, { useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext';

function CreatePost() {
    
    const { authState } = useContext(AuthContext);
    let history = useHistory();
    const initialValue = {
        title: "",
        postText: "",
    }

    useEffect(() => {
        if(!localStorage.getItem('accessToken')) {
            history.push("/login")
        }
    }, [])

    const onSubmit = (data) => {
        axios.post('http://localhost:3001/posts', data, {
            headers: {accessToken : localStorage.getItem("accessToken")}
        }).then((res) => {
            history.push('/')
        })
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You mush input the title"),
        postText: Yup.string().required(),
    });

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
                    <button type="submit"> Create Post</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost