import React, { useState } from 'react';
import './Page.css';
import { motion } from 'framer-motion';

export function PageRender({ data }) {
  console.log("Page data received:", data);
  const [liked, setLiked] = useState(false);
  
  // Check if data and data.page_src exist before trying to use them
  if (!data || !data.data.page_src) {
    return (
      <div className='Page'>
        <p>Error: Missing page data or image source</p>
      </div>
    );
  }
  
  // Use a safer approach to import images
  let imageSrc;
  try {
    // Use a dynamic import with require
    imageSrc = require(`../../../public/pages/${data.data.page_src}`);
    console.log("Image source:", imageSrc);
  } catch (error) {
    console.error("Failed to load image:", error);
    return (
      <div className='Page'>
        <p>Error loading image: {data.page_src}</p>
      </div>
    );
  }

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleShareClick = () => {
    // Vous pouvez modifier cette URL selon vos besoins
    window.open("https://example.com/share", "_blank");
  };

  return (
    <div>
      <div className='Page'>
        <motion.div
          className='Page-content'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          <img
            src={imageSrc}
            alt={data.data.page_src}
            className='Page-image'
          />
        </motion.div>
        <div className='comments-section'>
          <h2 className='Page-comments-title'>{data.data.book_title}</h2>
          
          <div className='Page-comments'>
            {/* Nouveaux boutons */}
          </div>
              <input
                type="text"
                placeholder="Add a comment..."
                className='Page-comments-input'
              />
              <button className='Page-comments-button'>Submit</button>
            <div className='action-buttons'>
              <button 
                className={`action-button ${liked ? 'liked' : ''}`}
                onClick={handleLikeClick}
              >
                <i className={liked ? 'fas fa-heart' : 'far fa-heart'}></i>
              </button>
              <button 
                className='action-button'
                onClick={() => navigator.clipboard.writeText(window.location.href)}
              >
                <i className='fas fa-link'></i>
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default PageRender;