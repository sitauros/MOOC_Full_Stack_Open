const Filter = ({props: {filterString, setFilterString, setDisplayCountry, setWeather}}) => {

    const handleInput = (event) => {
        setWeather([])
        setDisplayCountry("")
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