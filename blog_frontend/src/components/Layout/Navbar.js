import React, {useState, useEffect} from "react"
import {AppBar, Avatar, Button, Toolbar, Typography} from "@material-ui/core";
import blogImg from "../images/plan.png";
import useStyles from "./styles"
import {Link, useNavigate, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ActionType} from "../../constants/actionType"
import decode from 'jwt-decode'
const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location  = useLocation()

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    useEffect(()=>{
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('profile')))

        //jwt expire
        if(token){
            const decodedToken = decode(token)

            if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }

    },[location])

    const logout = ()=>{
        dispatch({type:ActionType.LOGOUT})
        navigate('/')
        setUser(null)

    }

    return(
        <AppBar className={classes.appBar} position={"static"} color={"inherit"}>
            <div className={classes.brandContainer}>
                <Typography component = {Link} to = {"/"} className={classes.heading} variant={"h2"} align={"center"}>Blog Site</Typography>
                <img className={classes.image} src={blogImg} alt={"logo"} height = "60" width={"auto"}/>
            </div>
            <Toolbar className={classes.toolbar}>
                {user?(
                    <div className={classes.profile}>
                        <Avatar
                            className = {classes.purple}
                            alt={user.result.name}
                            src = {user.result.imageUrl}
                        >
                                {user.result.name.charAt(0)}
                        </Avatar>
                            <Typography className={classes.userName} variant={"h6"}>{user.result.name}</Typography>
                            <Button variant={"contained"} className={classes.logout} color={"secondary"} onClick={logout}>Logout</Button>
                    </div>
                ):(
                    <Button component = {Link} to={"/auth"} variant={"contained"} color={"primary"}>
                        Sign in
                    </Button>
                )}

            </Toolbar>
        </AppBar>
    )

}

export default Navbar