const Filter = ({props}) => {

    const {filterString, setFilterString} = {...props}

    return (
        <div>
          filter shown with: <input value={filterString} onChange={(event) => setFilterString(event.target.value)} />
        </div>
    )
}

export default Filter