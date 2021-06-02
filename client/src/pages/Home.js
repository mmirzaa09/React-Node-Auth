import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { AuthContext } from '../helpers/AuthContext';

function Home() {

    const [listOfPost, setListOfPost] = useState([]);
    const [ likedPost, setLikedPost ] = useState([])
    const { authState } = useContext(AuthContext);
    let history = useHistory();

    useEffect(() => {

        if(!localStorage.getItem('accessToken')){
            history.push('/login')
        } else {
            axios.get('http://localhost:3001/posts', {
                headers: { 
                    accessToken: localStorage.getItem('accessToken') 
                }
            }).then((res) => {
                setListOfPost(res.data.listOfPost)
                setLikedPost(res.data.likedPost.map((like) => {
                        return like.PostId;
                    })
                );
            });
        }
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
            // alert(response.data);
            setListOfPost(
                listOfPost.map((post) => {
                    if(post.id === postId) {
                        if(response.data.liked){
                            return {...post, Likes: [...post.Likes, 0]};
                        } else {
                            const likeArray = post.Likes
                            likeArray.pop()
                            return {...post, Likes: likeArray};
                        }
                    } else {
                        return post;
                    }
                })
            );

            if(likedPost.includes(postId)) {
                setLikedPost(likedPost.filter((id) => {
                    return id !== postId;
                }))
            } else {
                setLikedPost([...likedPost, postId])
            }
        });
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
                        <div className="username">{value.username}</div>
                        <div className="buttons">
                            <ThumbUpAltIcon
                                onClick={() => {
                                    LikeAPost(value.id)
                                }}
                                className={likedPost.includes(value.id) ? "unlikeBttn" : "likeBttn"}
                            />
                        </div>
                        <label>{value.Likes.length}</label>
                    </div>
                </div>
                );
            })}
        </div>
    )
}

export default Home
