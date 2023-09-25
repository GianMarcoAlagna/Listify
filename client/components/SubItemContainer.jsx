import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';
import * as actions from '../actions/todoActions';
import SubTodoCreator from "./SubTodoCreator.jsx"
import ListItem from "./ListItem.jsx";

function SubItemContainer({ showSublist, setShowSublist }) {
    const sublist = useSelector(state => state.todoReducer.currentSubItems);
    const dispatch = useDispatch();
    const mainRef = useRef(null);
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
        <div ref={mainRef} className={showSublist ? 'SubItemContainerShow' : 'SubItemContainer'}>
            <div id='SubItemCreator'>
                <input type='button' id='SubButton' value='Close' onClick={() => {
                    mainRef.current.classList.add('SubItemContainerClosing');
                    setTimeout(() => {
                        mainRef.current.classList.remove('SubItemContainerClosing');
                        setShowSublist(!showSublist)
                    }, 500);
                }} />
                <SubTodoCreator />
            </div>
            <input
                id='subCompleteButton'
                type="button"
                value="Complete"
                onClick={() => {
                    handleSubComplete();
                }}
            />
            <div>
                { subListArray }
            </div>
        </div>
    );
}

export default SubItemContainer;