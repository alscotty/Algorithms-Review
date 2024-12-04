import { useState } from 'react'
import './styles.css'

const DropDown = ({ placeHolderText, windowOptions, cssStyle }) => {
    const [window, setWindow] = useState(placeHolderText);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const updateWindow = (e) => {
        setWindow(e.target.value);
        setDropdownVisible(false)
    }
    const makeVisible = () => {
        setDropdownVisible(!dropdownVisible)
    }

    return (
        <div className='App'>
            Dropdown
            <br />
            <button onClick={() => makeVisible()} id={cssStyle}>
                {window} ^
            </button>
            <br />
            {dropdownVisible ?
                <div className='dropdown' >
                    {windowOptions.map(currentWindow => {
                        return (
                            <button className='dropdown-buttons'id= {cssStyle} onClick={(e) => updateWindow(e)} value={currentWindow}>
                                {currentWindow}
                            </button>
                        )
                    })}
                </div>

                : ''}
        </div >
    )
}

export default DropDown