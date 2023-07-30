const Notification = ({notice: {message, type}}) => {
    
    if (message === null) {
        return null
    }
    else {
        return <div className={`notification ${type}`}>{message}</div>
    }

}

export default Notification