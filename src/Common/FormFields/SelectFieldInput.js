// SelectFieldInput
import React, { Component } from 'react';
import './formfields.css';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ErrorOutlinedIcon from '@material-ui/icons/ErrorOutlined';


const SelectFieldInput = (props) => {
    const handleChange = (name,value) =>
    {
        props.handleChange(name,value)
    }

//  const checkSubmit = (ev) => {
//     //console.log(`Pressed keyCode ${ev.key}`);
//     if (ev.key === 'Enter') {
//       // Do code here
//       if (ev.target.name === "gender" ) {
//         ev.preventDefault();
//         props.checkSubmit()
//       }
//     }
//   }
    return (
        <div className="selectfieldinput">
          <FormControl error={props.selecterror}
          >
                    <InputLabel htmlFor="bootstrap-input "
                     className="textinputlabel" >
                        {props.inputLabel}
                    </InputLabel>
                    <Select
                        native
                        labelWidth={props.labelWidth}
                        inputProps={{
                             name: 'age',
                             id: 'outlined-age-simple',
                        }}
                        error = {props.error}
                        placeholder={props.placeholder}
                        searchable={false}
                        value={props.value}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        inputProps={props.InputProps}
                        displayEmpty={props.displayEmpty}
                        name={props.textinputname}
                        className={"selectinput" + " " + props.selectnewclass}
                    >
                        {props.selectoptions.map(item => {
                            return (
                                <option value={item.value}>
                                {item.label}
                                </option>
                            )
                        })
                        }
                    </Select>
                    {props.errorText ?
                     <FormHelperText id="component-error-text" className="errormsg"><ErrorOutlinedIcon className="erroricon"/> 
                     {props.errorText}
                     </FormHelperText>
                     :null}
                </FormControl>
        </div>
    );

}

export default SelectFieldInput;
