import '../css/Todo.css';
import parseEntries from '../utils/parseEntries';
import SubItemContainer from './SubItemContainer.jsx';
import { useState } from 'react';

function TodoDisplay({ entries, animate }) {
    const [ subItems, setSubItems ] = useState([]);
    const [ showSublist, setShowSublist ] = useState(false);
    const displayList = parseEntries(entries, animate, setSubItems, setShowSublist);

    return (
        <div className='displayList'>
            <div className='innerDisplayList'>
                { displayList }
            </div>
            <SubItemContainer subItems={ subItems } showSublist={ showSublist } />
        </div>
    );
}

export default TodoDisplay;
