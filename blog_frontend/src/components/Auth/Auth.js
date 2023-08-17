import React,{useState} from "react"
import {Paper, Avatar, Button, Grid, Typography, Container} from "@material-ui/core"
import useStyles from "./styles"
import {LockOpenOutlined} from "@material-ui/icons";
import Input from "./input"
import {GoogleLogin} from "react-google-login"
import Icon from "./icons"
import {useDispatch} from "react-redux";
import {ActionType} from "../../constants/actionType";
import {useNavigate} from "react-router-dom";
import {signIn, signUp} from "../../redux/actions/authActions";


function Auth () {
    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const initialState={
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
    }

    const [formData, setFormData] = useState(initialState)
    const [showPassword, setShowPassword] = useState(false)
    const [showCPassword, setShowCPassword] = useState(false)
    const [isSignedUp, setIsSignedUp] = useState(false)

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(isSignedUp){
            dispatch(signUp(formData, navigate))
        }else{
            dispatch(signIn(formData, navigate))
        }
    }

    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    const handleShowCPassword = () => setShowCPassword((prevShowCPassword) => !prevShowCPassword)

    const switchMode = () => {
        setIsSignedUp((prevIsSignedUp) => !prevIsSignedUp);
        setShowPassword(false)
        setShowCPassword(false)
        clear();
    }

    const googleSuccess = (res)=>{
        const result = res?.profileObj;
        const token = res?.tokenId;
        console.log(result)

        try{
            dispatch({type:ActionType.AUTH, data:{result, token}})
            navigate('/')
        }catch (e) {
            console.log(e)
        }
    }
    const googleFailure = (e)=>{
        console.log(e)
    }

    const clear = ()=>{
        setFormData(initialState)
    }


    return(
        <Container component={"main"} maxWidth={"xs"}>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOpenOutlined/>
                </Avatar>
                <Typography variant={"h5"}>
                    {isSignedUp?"Sign Up":"Sign In"}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} autoComplete={"off" }>
                    <Grid container spacing={2}>
                        {isSignedUp&&(
                            <>
                                <Input name = "firstName" label="First Name" handleChange={handleChange} half />
                                <Input name = "lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword}/>
                        {isSignedUp&&(
                            <Input name="confirmPassword" label = "Confirm Password" handleChange={handleChange} type={showCPassword?"text":"password"} handleShowCPassword={handleShowCPassword}/>
                        )}
                    </Grid>

                        <Button
                            className={classes.submit}
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            {isSignedUp?"Sign Up":"Sign In"}
                        </Button>
                    <GoogleLogin
                        clientId="481704173121-qu597boh19fvbilpsampjcm22jflf0eo.apps.googleusercontent.com"
                        render={(renderProps)=>(
                            <Button
                                className={classes.googleButton}
                                color={"primary"}
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >
                                Sign in with Google
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={"single_host_origin"}
                    />
                    <Grid container justifyContent={"flex-end"}>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignedUp?"Already have an account? Sign in.":"Dont have an Account? Sign in"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
export default Auth