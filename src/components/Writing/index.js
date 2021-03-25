import React, { useState, useContext } from "react";
import { EditorState, ContentState, convertToRaw, convertFromHTML, getPlainText } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from 'draft-convert';
import SearchPhotos from '../SearchPhotos/index';
import htmlToDraft from 'html-to-draftjs';
import draftToMarkdown from 'draftjs-to-markdown';
import { ContentContext } from "../../context/Content";


const Writing = () => {
  const { content, setContent } = useContext(ContentContext);
  let _contentState = ContentState.createFromText(content);
  const raw = convertToRaw(_contentState);
  const [contentState, setContentState] = useState(raw);
  const [convertedContent, setConvertedContent] = useState(raw);
  const [editorState, setEditorState] = useState(
    () => EditorState.createWithContent(ContentState.createFromText(content))
  )

  const handleEditorState = (state) => {
    setEditorState(state);
    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    setContent(value)
    localStorage.setItem('content', value);
    convertContentToHTML();
  }

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML)
  }

  return (
    <>
      <Editor onEditorFocus
        editorState={editorState}
        onEditorStateChange={handleEditorState}
        defaultContentState={contentState}
        onContentStateChange={setContentState}
      />
      <div className="editor-footer">
        <SearchPhotos editorState={editorState} setContentState={setContentState}/>
      </div>
    </>)
}

export default Writing;
