import React from 'react';
import './formfields.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormHelperText from '@material-ui/core/FormHelperText';
import ErrorOutlinedIcon from '@material-ui/icons/ErrorOutlined';


const DatePickerInput = (props) => {

    return (
        <div className={"newdatetimefield" + " " + props.datepickerextracls}>
            {props.inputLabel ?
                <span className={"datepickerlabel" + " " + props.extralabelcls}>{props.inputLabel}</span> :
                null}
            <DatePicker
                disabled={props.disabled}
                selected={props.value}
                name={props.textinputname}
                value={props.defaultValue}
                onChange={props.handleChnage}
                peekNextMonth
                placeholderText={props.placeholder}
                showTimeSelect={props.showTimeSelect}
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMM dd, yyyy"
                showMonthDropdown
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={25}
                isClearable
            />
            {props.errorText ?
                <FormHelperText id="component-error-text" className="errormsg"><ErrorOutlinedIcon className="erroricon" />
                    {props.errorText}
                </FormHelperText>
                : null}
        </div>
    );

}

export default DatePickerInput;
