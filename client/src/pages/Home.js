import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

function Home() {

    const [listOfPost, setListOfPost] = useState([]);
    let history = useHistory();

    useEffect(() => {
      axios.get('http://localhost:3001/posts').then((res) => {
        setListOfPost(res.data)
        console.log(res.data)
      }).catch((error) => {
          console.log('cek',error)
      })
    }, []);

    const LikeAPost = (postId) => {
        axios.post("http://localhost:3001/like", 
        { PostId: postId}, 
        { 
            headers: { 
                accessToken: localStorage.getItem('accessToken') 
            }
        })
        .then((response) => {
            alert(response.data);
            setListOfPost(listOfPost.map((post) => {
                if(post.id === postId) {
                    if(response.data.liked){
                        return {...post, Likes: [...post.Likes, 0]};
                    } else {
                        const likeArray = post.Likes
                        likeArray.pop()
                        return {...post, Likes: likeArray};
                    }
                } else {
                    return post
                }
            }))
        })
    };

    return (
        <div>
            {listOfPost.map((value, key) => {
                return (
                <div 
                    key={key} 
                    className="post" 
                > 
                    <div className="title">{value.title}</div>
                    <div 
                        className="body"
                        onClick={() => {
                            history.push(`/post/${value.id}`)
                        }}
                    >{value.postText}</div>
                    <div className="footer">
                        {value.username}
                        <button onClick={() => {LikeAPost(value.id)}}>
                            Like
                        </button>
                        <label>{value.Likes.length}</label>
                    </div>
                </div>
                );
            })}
        </div>
    )
}

export default Home
