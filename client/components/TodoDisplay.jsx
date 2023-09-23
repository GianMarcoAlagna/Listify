import '../css/Todo.css';
import parseEntries from '../utils/parseEntries';
import SubItemContainer from './SubItemContainer.jsx';
import { useState } from 'react';

function TodoDisplay({ entries, animate }) {
    const [ showSublist, setShowSublist ] = useState(false);
    const displayList = parseEntries(entries, animate, setShowSublist);

    return (
        <div className='displayList'>
            <div className={!showSublist ? `innerDisplayList` : `innerDisplayListHide`}>
                { displayList }
            </div>
            <SubItemContainer 
            showSublist={ showSublist } 
            setShowSublist={ setShowSublist } />
        </div>
    );
}

export default TodoDisplay;
