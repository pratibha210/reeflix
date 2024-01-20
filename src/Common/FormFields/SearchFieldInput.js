import React, { Component } from 'react';
import './formfields.css';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const SearchFieldInput =(props)=> {

        return (
            <div className={'searchfieldinput' + " " + props.serchbarcls}>
                <form autoComplete="">
                    <Paper className="searchinputmain">

                        <InputBase
                            className="searchninput"
                            onChange={props.onChange}
                            value={props.value}
                            placeholder="Search"
                            inputProps={'aria-label'}
                        />
                        <IconButton className="searchinputicon" aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </form>
            </div>
        );

}

export default SearchFieldInput;


