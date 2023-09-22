import TodoCreator from "./TodoCreator.jsx"

function SubItemContainer({ subItems, showSublist }) {
    return (
        <div className={showSublist ? 'SubItemContainerShow' : 'SubItemContainer'}>
            <TodoCreator subList={true} />
            <div>
                { subItems }
            </div>
        </div>
    )
}

export default SubItemContainer;