const Filter = ({props: {filterString, displayCountry, setFilterString, setDisplayCountry}}) => {

    const handleInput = (event) => {
        if (displayCountry !== ""){
            setDisplayCountry("")
        }
        setFilterString(event.target.value)
    }

    return (
        <div>
            find countries &nbsp;
            <input type="search" value={filterString} onChange={(event) => handleInput(event)} />
        </div>
    )
}

export default Filter