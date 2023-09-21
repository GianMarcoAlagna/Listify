import ListItem from '../components/ListItem.jsx';

function parseEntries(entries, animate) {
    return (
        Object.keys(entries).map(entryKey => 
        <ListItem key={entries[entryKey].value} 
        id={entries[entryKey].value} 
        value={entries[entryKey].value}
        animate={animate} />
    ));
}

export default parseEntries;
