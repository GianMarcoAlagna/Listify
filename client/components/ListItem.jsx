import { useDispatch } from 'react-redux';
import { updateCheckedItemActionCreator, updateCheckedSubItemActionCreator } from '../actions/todoActions';
import { useSpringValue, animated } from 'react-spring';
import { useEffect, useState } from 'react';
import * as actions from "../actions/todoActions.js"

const ListItem = ({ id, value, animate, setShowSublist, subItem }) => {
    const dispatch = useDispatch();
    const opacity = useSpringValue(0);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        opacity.start(1);
    }, [opacity]);

    useEffect(() => {
        if(animate && checked) {
            opacity.start(0);
        }
    }, [animate, checked, opacity]);

    function handleSubMenuClick() {
        dispatch(actions.setCurrentItemActionCreator(value));
        setShowSublist((prev) => !prev);
    }

    return (
        <animated.div className='listItem' style={{ opacity }}>
            <label>
                <input
                    type="checkbox"
                    name={"check"}
                    value={"check"}
                    onChange={(e) => {
                        setChecked(e.target.checked);
                        dispatch(subItem ? updateCheckedSubItemActionCreator(id) : updateCheckedItemActionCreator(id));
                    }}
                />
                <span>
                    { value }
                </span>
            </label>
            {!subItem && <button onClick={ handleSubMenuClick } className='SubMenuButton'>&gt;</button>}
        </animated.div>
    );
}

export default ListItem;
