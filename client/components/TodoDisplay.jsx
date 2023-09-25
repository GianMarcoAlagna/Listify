import '../css/Todo.css';
import parseEntries from '../utils/parseEntries';
import SubItemContainer from './SubItemContainer.jsx';
import { useRef, useState } from 'react';

function TodoDisplay({ entries, animate }) {
    const [ showSublist, setShowSublist ] = useState(false);
    const innerDisplayRef = useRef();
    const displayList = parseEntries(entries, animate, setShowSublist);
    return (
        <div className='displayList'>
            <div ref={innerDisplayRef} className={!showSublist ? `innerDisplayList` : `innerDisplayListHide`}>
                { displayList }
            </div>
            <SubItemContainer 
            showSublist={ showSublist } 
            setShowSublist={ setShowSublist } />
        </div>
    );
}

export default TodoDisplay;
