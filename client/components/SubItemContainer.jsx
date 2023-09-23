import { useSelector } from 'react-redux';
import SubTodoCreator from "./SubTodoCreator.jsx"
import ListItem from "./ListItem.jsx";

function SubItemContainer({ showSublist, setShowSublist }) {
    const subItems = useSelector(state => state.todoReducer.currentSubItems);
    const subItemsArray = subItems.map(el => {
        return (
            <ListItem id={el.value} value={el.value} />
        );
    });
    return (
        <div className={showSublist ? 'SubItemContainerShow' : 'SubItemContainer'}>
            <input type='button' id='SubButton' value='Close' onClick={() => setShowSublist(!showSublist)} />
            <SubTodoCreator />
            <div>
                { subItemsArray }
            </div>
        </div>
    );
}

export default SubItemContainer;