import React, { Component } from 'react';
import './formfields.css';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import ErrorOutlinedIcon from '@material-ui/icons/ErrorOutlined';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';




const TextAreaFieldInput = (props) => {

    const onChange = (name,value) =>{

        props.onChange(name,value)


    }


    
    return (
        <div className="textfield-inputstart">
            <form autoComplete="off">
                {props.inputLabel ?
                    <InputLabel shrink htmlFor="bootstrap-input" className={"textinputlabel" + " " + props.extralabelcls}>
                        {props.inputLabel}
                    </InputLabel>
                    : null}
                <TextField
                    disabled={props.disabled}
                    defaultValue={props.defaultValue}
                    className={"textfieldclass textareacls" + " " + props.textnewclass}
                    type={props.textinputType}
                    name={props.textinputname}
                    margin="dense"
                    variant="outlined"
                    multiline
                    rowsMax={props.MaxRowsnumber}
                    rows={props.rowsnumber}
                    fullWidth
                    placeholder={props.placeholder}
                    onChange={(e)=>onChange(e.target.name,e.target.value)}
                    InputProps={props.InputProps}
                    error={props.error}
                    InputLabelProps={props.InputLabelProps}
                    value={props.value}
                    InputProps={props.InputProps}
                
                />
                {props.errorText ?
                    <FormHelperText id="component-error-text" className="errormsg">
                        <ErrorOutlinedIcon className="erroricon" />{props.errorText}
                    </FormHelperText>
                    : null}
            </form>
        </div>
    );

}

export default TextAreaFieldInput;
