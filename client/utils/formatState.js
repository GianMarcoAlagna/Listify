function formatState(userData) {
    const formattedItems = userData.entries.map(el => {
        return {
            value: el.value,
            completed: el.checked, 
            sublist: el.sublist.length ? el.sublist.map(el => {
                return {value: el.value, checked: el.checked}
            }) : []
        };
    });

    const formattedData = {
        textEditor: userData.textEditor,
        todo: {
            items: formattedItems
        }
    };
    return formattedData;
}

export default formatState;