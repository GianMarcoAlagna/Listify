import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions/todoActions';
import SubTodoCreator from "./SubTodoCreator.jsx"
import ListItem from "./ListItem.jsx";

function SubItemContainer({ showSublist, setShowSublist }) {
    const sublist = useSelector(state => state.todoReducer.currentSubItems);
    const dispatch = useDispatch();
    const subListArray = sublist.map(el => {
        return (
            <ListItem 
            id={el.value} 
            value={el.value} 
            animate={undefined}
            setShowSublist={undefined} 
            subItem={true} />
        );
    });

    function handleSubComplete() {
        return dispatch(actions.completeSubItemsActionCreator());
    }

    return (
        <div className={showSublist ? 'SubItemContainerShow' : 'SubItemContainer'}>
            <div id='SubItemCreator'>
                <input type='button' id='SubButton' value='Close' onClick={() => setShowSublist(!showSublist)} />
                <SubTodoCreator />
                <input
                    id='completeButton'
                    type="button"
                    value="Complete"
                    onClick={() => {
                        handleSubComplete();
                    }}
                />
            </div>
            <div>
                { subListArray }
            </div>
        </div>
    );
}

export default SubItemContainer;