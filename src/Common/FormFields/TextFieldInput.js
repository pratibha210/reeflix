import React, { Component } from 'react';
import './formfields.css';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import ErrorOutlinedIcon from '@material-ui/icons/ErrorOutlined';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';




const TextFieldInput = (props) => {

    const onChange = (name,value) =>{

        props.onChange(name,value)


    }

///// adding Pratibha////function for enter button as submit button call//////
const checkLogin = (ev) => {

    if (ev.key === 'Enter') {
      // Do code here
      if (ev.target.name == "password" || ev.target.name == "phoneNumber") {
        ev.preventDefault();
        props.clickLogin()
      } else if ( ev.target.name == "name"|| ev.target.name == "email" || ev.target.name == "otp"
        || ev.target.name == "phoneNumber" ||ev.target.name == "password"|| ev.target.name == "confirmPassword") {
        ev.preventDefault();
        props.clickLogin()

      }
    }

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
                    className={"textfieldclass" + " " + props.textnewclass}
                    type={props.textinputType}
                    name={props.textinputname}
                    margin="dense"
                    variant="outlined"
                    multiline={props.multilineState}
                    rowsMax={props.MaxRowsnumber}
                    rows={props.rowsnumber}
                    fullWidth={props.fullwidthState}
                    placeholder={props.placeholder}
                    onChange={(e)=>onChange(e.target.name,e.target.value)}
                    InputProps={props.InputProps}
                    error={props.error}
                    InputLabelProps={props.InputLabelProps}
                    value={props.value}
                    onKeyPress={(ev) => checkLogin(ev)}
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

export default TextFieldInput;
