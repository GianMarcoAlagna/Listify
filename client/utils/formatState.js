function formatState(userData) {
    const formattedItems = userData.entries.map(el => {
        return {
            value: el.value,
            completed: el.checked, 
            sublist: el.subItems.length ? el.subItems.map(el => {
                return {value: el.value, completed: el.checked}
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