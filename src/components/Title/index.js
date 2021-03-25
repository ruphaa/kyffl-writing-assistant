import React, { useState } from 'react';

const Title = () => {
  const generateTitle = () => {
  }

  return (
    <div className="blog-title">
      <input type="text" name="title" placeholder="Title goes here"/>
      <button className="generate-title">Generate</button>
    </div>
  )
}

export default Title;
