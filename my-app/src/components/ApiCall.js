import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ApiCallStyles.css"
let limit = 6;

const ApiCall = () => {
    const [posts, setPosts] = useState([])
    const [visibleItems, setVisibleItems] = useState(limit);

    //  for limit how many numbers of card should display on home
    const handleLoadMore = () => {
        setVisibleItems(visibleItems + limit);
    }

    const handleTagChange = (event) => {
        const newTags = event.target.value.split(/[, ]+/);
        setPosts(newTags)
    };

    useEffect(() => {
        axios
            .get('https://dummyjson.com/posts')

            .then((res) => {
                console.log(res)
                setPosts(res.data.posts)
            }).catch((err) => {
                console.log('error')
            })
    }, [])

    return (

        <div className="work-container">
            <h1 className="project-heading">DETRATOR ASSIGNMENT</h1>
            <div className='parent-container'>
                {posts?.slice(0, visibleItems)?.map((item, index) => (
                    <div className='grid-item' key={index}>
                        {/* render only post title */}
                        <div className='title'><h2>{item.title}</h2></div>
                        {/* render only post body */}
                        <div className='body'>{item.body}</div>

                        {/* render tags and reaction */}
                        <div className="about">
                            <div onChange={handleTagChange}>Tags : {item.tags.join()}</div>
                            <div>Reaction : {item.reactions}</div>
                        </div>
                    </div>
                ))}
            </div>
            {/* render view more option to see more posts */}
            <div className='btn'>
                    {visibleItems < posts.length && (
                        <button className='' onClick={handleLoadMore}>View More</button>
                    )}
                </div>
        </div>
    )
}

export default ApiCall
