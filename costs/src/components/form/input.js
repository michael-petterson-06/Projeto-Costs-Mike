import Styles from './input.module.css';

function input ({type, text, name, placeholder, handleOnChange, value}) {
    return (
        <div className={ Styles.form_control }>
            <label htmlFor={ name }>{ text }:</label>
            <input
                 type={ type }
                 id={ name }
                 name={ name }
                 placeholder={ placeholder }
                 onChange={ handleOnChange}
                value={ value }
            />
        </div>
    )
}

export default input;