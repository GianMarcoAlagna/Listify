import '../css/Todo.css';
import ListItem from './ListItem.jsx';
// import { useTransition, animated } from 'react-spring';

function TodoDisplay({ entries, animate }) {
    const displayList = Object.keys(entries).map(entryKey => 
        <ListItem key={entries[entryKey].value} 
        id={entries[entryKey].value} 
        value={entries[entryKey].value}
        animate={animate} />
    );
    return (
        <div className='displayList'>
            <div className='innerDisplayList'>
                { displayList }
            </div>
        </div>
    );
}

export default TodoDisplay;
