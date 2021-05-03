import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';

function Home() {

    const [listOfPost, setListOfPost] = useState([])

    useEffect(() => {
      axios.get('http://localhost:3001/posts').then((res) => {
        setListOfPost(res.data)
      })
    }, [])

    return (
        <div>
            {listOfPost.map((value, key) => {
                return (
                <div className="post"> 
                    <div className="title">{value.title}</div>
                    <div className="body">{value.postText}</div>
                    <div className="footer">{value.username}</div>
                </div>
                );
            })}
        </div>
    )
}

export default Home
