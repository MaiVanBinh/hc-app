import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement;
    let inputClasses = props.inputRegister ? [classes.InputField] : [classes.InputElement];
    if(props.invalid && props.shouldValidate&&props.touched) {
        inputClasses.push(classes.Invalid);
    }
    switch(props.elementType){
        case ('input'):
            inputElement = <input 
                className={inputClasses.join(' ')}
                {...props.elementConfig}  
                value={props.value}
                onChange={props.changed}
                />;
            break;
        case('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')}
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} 
                />;
            break;
        case('select'):
            inputElement = (
                <select 
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>);
            break;
        default: 
            inputElement = <input 
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} 
                    onChange={props.changed}
                />;
    }
    return (
        <div className={classes.Input}>
            {props.label ? <label className={classes.Label}>{props.label}</label> : null}
            {inputElement}
            {props.touched && props.invalid ? <p style={{color: 'lightcoral'}}>{props.messageError}</p> : null }
        </div>
    );
}
export default input;