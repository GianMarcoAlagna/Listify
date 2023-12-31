import ListItem from '../components/ListItem.jsx';

function parseEntries(entries, animate, setShowSublist) {
    return (
        entries.map(entry => 
        <ListItem key={entry.value} 
        id={entry.value} 
        value={entry.value}
        animate={animate} 
        setShowSublist={setShowSublist} />
    ));
}

export default parseEntries;
