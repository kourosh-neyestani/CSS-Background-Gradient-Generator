import React from 'react';
import './style.css';

class Header extends React.Component {
    render() {
        const {output} = this.props;
        return (
            <header className='site-header'>
                <h1>CSS <span>Gradient</span> <small>v1.0</small></h1>

            </header>
        )
    }
}

export default Header;