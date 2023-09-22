import ListItem from '../components/ListItem.jsx';

function parseEntries(entries, animate, setSubItems, setShowSublist) {
    return (
        entries.map(entry => 
        <ListItem key={entry.value} 
        id={entry.value} 
        value={entry.value}
        animate={animate} 
        subItems={entry.subItems}
        setSubItems={setSubItems}
        setShowSublist={setShowSublist} />
    ));
}

export default parseEntries;
