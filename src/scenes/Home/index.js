import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import './style.css';

function Home() {

    const [color1, setColor1] = useState('#ffc800');
    const [color2, setColor2] = useState('#ff4500');
    const [show, setShow] = useState(false);
    const [angle, setAngle] = useState(0);
    const [type, setType] = useState('linear-gradient');

    const handleClick = (type, value) => {
        switch (type) {
            case 'type':
                setType(value);
                break;
            case 'color1':
                setColor1(value.hex);
                break;
            case 'color2':
                setColor2(value.hex);
                break;
            case 'show':
                setShow(value);
                break;
            default:
                return false;
        }
    }

    const handleChange = (event) => {
        setAngle(event.target.value);
    }

    const copyToClipboard = (code) => {
        var textField = document.createElement('textarea')
        textField.innerText = code
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        console.log(code)
    }

    const gradient = `(${type === 'linear-gradient' ? angle + 'deg, ' : ''}${color1}, ${color2})`;

    return (
        <div>
            {console.log(show)}
            <div style={{ backgroundImage: type + gradient }} className='wrapper'>
                <div className='options'>
                    <div className='option color-picker color-picker-1'>
                        <h4>Select Color 1</h4>
                        <ChromePicker
                            color={color1}
                            onChange={(color) => handleClick('color1', color)}
                        />
                    </div>
                    <div className='option color-picker color-picker-2'>
                        <h4>Select Color 2</h4>
                        <ChromePicker
                            color={color2}
                            onChange={(color) => handleClick('color2', color)}
                        />
                    </div>
                    <div className='option'>
                        <h4>Gradients Type</h4>
                        <div className='button-group'>
                            <button className={['button', (type === 'radial-gradient' && 'active')].join(' ')} onClick={() => handleClick('type', 'radial-gradient')}>Radial</button>
                            <button className={['button', (type === 'linear-gradient' && 'active')].join(' ')} onClick={() => handleClick('type', 'linear-gradient')}>Linear</button>
                        </div>
                        {type === 'linear-gradient' ? (
                            <div className='range-slider'>
                                <input
                                    min="-180"
                                    max="180"
                                    step="1"
                                    type="range"
                                    value={angle}
                                    onChange={(event) => handleChange(event)}
                                />
                                <span>{angle} deg</span>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            <button className='button-modal' onClick={() => handleClick('show', true)}>CSS Output</button>
            <div className={['modal-wrap', show && 'active'].join(' ')}>
                <div className={['modal', show && 'active'].join(' ')}>
                    <div className='menu'>
                        <button className='close' onClick={() => handleClick('show', false)}>x</button>
                    </div>
                    <div className='output'>
                        <p>background: -webkit-{type}{gradient};</p>
                        <p>background: {type}{gradient};</p>
                        <button className='button' onClick={() => copyToClipboard(`background: -webkit-${type}${gradient}; background: ${type}${gradient};`)}>Copy to clipboard</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;