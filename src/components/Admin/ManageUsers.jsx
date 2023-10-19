import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Card, Typography, Grid, Container, Badge } from '@mui/material';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export default function ManageUsers() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch()
    const allUsers = useSelector((store) => store.manageUsersReducer)

    useEffect(() => {
        dispatch({ type: "FETCH_USER_LIST" });
    }, []);

    const handleCaptain = (id) => {
        console.log("allusers", allUsers)
        console.log("user", id);
        dispatch({ type: "PROMOTE_USER", payload: id, auth: 3});
    }

    const handleAdmin = (id) => {
        console.log("allusers", allUsers)
        console.log("user", id);
        dispatch({ type: "PROMOTE_USER", payload: id, auth: 4});
    }

    const handleSiteAdmin = (id) => {
        console.log("allusers", allUsers)
        console.log("user", id);
        dispatch({ type: "PROMOTE_USER", payload: id, auth: 5});
    }


    return (
        <Container>
            <Grid container spacing={3}>
                {allUsers.map((user) => (
                    <Grid item xs={12} sm={6} md={4} key={user.id}>

                        <Card sx={{ padding: '20px', margin: '10px', border: '1px solid grey' }}>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="h5">
                                    {user.username} - {user.email}
                                </Typography>
                                <Button
                                    id="demo-customized-button"
                                    value={user.id}
                                    aria-controls={open ? 'demo-customized-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    variant="contained"
                                    disableElevation
                                    onClick={handleClick}
                                    endIcon={<KeyboardArrowDownIcon />}
                                > 
                                            <MilitaryTechIcon sx={{ fontSize: 30 }} />
                                            Promote
                                </Button>
                                <Menu
                                    id="demo-customized-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'demo-customized-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={() => { handleClose(); handleCaptain(anchorEl.value); }} disableRipple>
                                        <EditIcon />
                                        Make Team Captain
                                    </MenuItem>
                                    <MenuItem onClick={() => { handleClose(); handleAdmin(anchorEl.value); }} disableRipple>
                                        <FileCopyIcon />
                                        Make Tournament Admin
                                    </MenuItem>
                                    <MenuItem onClick={() => { handleClose(); handleSiteAdmin(anchorEl.value); }} disableRipple>
                                        <ArchiveIcon />
                                        Make Site Admin
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}