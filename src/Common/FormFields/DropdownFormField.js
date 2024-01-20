
import React, { Component } from 'react';
import './formfields.css';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

class DropdownForm extends Component {
    handleClick = (e, item) => {
        this.props.handleClick(item.value)
    }
    render() {
        return (
            <div className={"dropdowncomponent" + " " + this.props.dropdownextracls}>
                <Popover
                    id={this.props.id}
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    anchorEl={this.props.anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    disablePortal className={"dropdownancher" + " " + this.props.dropdownanchercls}
                >

                    <Paper id="menu-list-grow">
                        <MenuList className="dropdown-list">
                            {Array.isArray(this.props.dropdownOptions) && this.props.dropdownOptions.map(item => {
                                return (
                                    <MenuItem className="dropcls" onClick={(e) => this.handleClick(e, item)}>
                                        {item.facls &&
                                            <i className={item.facls + " " + "dropdownfaicon"} />
                                        }
                                        {item.imgsrc &&
                                            <img src={item.imgsrc} className="dropdownimg" />
                                        }
                                        {item.label}
                                    </MenuItem>
                                )
                            }
                            )
                            }
                        </MenuList>
                    </Paper>
                </Popover>
            </div>
        );
    }
}

export default DropdownForm;