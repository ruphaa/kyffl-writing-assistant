import React, { useState, useContext } from 'react';
import { ContentContext } from "../../context/Content";
import { calcWordCount, calcCharacterCount, calcReadabilityScore, calcReadingTime } from '../../utils/hygiene';


const Hygiene = () => {
  const { content } = useContext(ContentContext);

  const expandInfo = (e) => {
    let $el;
    if (e.target.parentElement.classList.contains('score')) {
      $el = e.target.parentElement
    } else if (e.target.classList.contains('score')) {
      $el = e.target
    }
    const $content = Array.from($el.children).filter(node => node.classList.contains('content'))[0];
    if ($content.classList.contains('expand')) {
      $content.classList.remove('expand')
      $content.style.maxHeight = '0';
    } else {
      $content.classList.add('expand')
      $content.style.maxHeight = '5rem';
    }
  }

  return (
    <div className="hygiene-container">
      <div className="basic-score">
        <div class="score word-count">
          <div className="title">Word count</div>
          <div className="content">{content && calcWordCount(content)} w</div>
        </div>
         <div class="score character-count">
          <div className="title">Character count</div>
          <div className="content">{content && calcCharacterCount(content)} c</div>
        </div>
        <div class="score readability-score">
          <div className="title">Readability score</div>
          <div className="content">{content && calcReadabilityScore(content)}</div>
        </div>
        <div class="score reading-time">
          <div className="title">Reading time</div>
          <div className="content">{content && calcReadingTime(content)}</div>
        </div>
      </div>
      <div className="complex-score">
        <div className="score subjectivity" onClick={expandInfo}>
          <div className="title">Subjectivity</div>
          <div className="rating"></div>
          <div className="content">
            More often than not Frontend developers stuck if there is no API to consume, they need an API to download data
          </div>
        </div>
        <div className="score tone" onClick={expandInfo}>
          <div className="title">Tone and Voice</div>
          <div className="rating"></div>
          <div className="content">
            More often than not Frontend developers stuck if there is no API to consume, they need an API to download data
          </div>
        </div>
        <div className="score readability" onClick={expandInfo}>
          <div className="title">Readability</div>
          <div className="rating"></div>
          <div className="content">
            More often than not Frontend developers stuck if there is no API to consume, they need an API to download data
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hygiene;
