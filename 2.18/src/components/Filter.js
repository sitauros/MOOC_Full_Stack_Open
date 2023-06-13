const Filter = ({props: {filterString, setFilterString}}) => {

    return (
        <div>
            find countries &nbsp;
            <input type="search" value={filterString} onChange={(event) => setFilterString(event.target.value)} />
        </div>
    )
}

export default Filter