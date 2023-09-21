import '../css/Todo.css';
import parseEntries from '../utils/parseEntries';


function TodoDisplay({ entries, animate }) {
    const displayList = parseEntries(entries, animate);
    return (
        <div className='displayList'>
            <div className='innerDisplayList'>
                { displayList }
            </div>
        </div>
    );
}

export default TodoDisplay;
