import { useDispatch } from 'react-redux';
import { updateCheckedItemActionCreator } from '../actions/todoActions';
import { useSpringValue, animated } from 'react-spring';
import { useEffect, useState } from 'react';

const ListItem = ({ id, value, animate }) => {
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

    return (
        <animated.div className='listItem' style={{ opacity }}>
            <label>
                <input
                    type="checkbox"
                    name={"check"}
                    value={"check"}
                    onChange={(e) => {
                        setChecked(e.target.checked);
                        dispatch(updateCheckedItemActionCreator(id));
                    }}
                />
                <span>
                    { value }
                </span>
            </label>
            <button className='SubMenuButton'>&gt;</button>
        </animated.div>
    );
}

export default ListItem;
