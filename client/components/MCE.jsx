import React from 'react';
import styled from 'styled-components';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import {  useSelector } from 'react-redux';
import NavBar from './NavBar.jsx';

function MCE() {
    const mainRef = useRef(null);
    const textEditorRef = useRef(null);
    const initialText = useSelector(state => state.todoReducer.textEditor);
    const apiKey = process.env.REACT_APP_TINYMCE_API_KEY;
    const MCEContainer = styled.div`
        margin: 0;
        display: flex;
        justify-content: center;
        width: fit-content;
        height: fit-content;
        box-shadow: 0px 10px 5px 10px rgba(0, 0, 0, 0.5);
        border-radius: 5px;
    `;

    return (
        <div ref={mainRef} className='moveInAnim'>
            <NavBar reference={mainRef} innerText={'Todo List'} path={'todo'} textEditorRef={textEditorRef} />
            <div className='MCEMain'>
                <MCEContainer>
                    <Editor 
                        apiKey={apiKey}
                        onInit={(evt, editor) => textEditorRef.current = editor}
                        initialValue={initialText}
                        init={{
                            height: '80vh',
                            width: '65vw',
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:24px }',
                            resize: 'both',
                            skin: 'oxide-dark',
                            content_css: 'dark',
                        }}
                        />
                </MCEContainer>
            </div>
        </div>
    );

}

export default MCE;