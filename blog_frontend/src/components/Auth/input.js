import {Grid, TextField, InputAdornment, IconButton} from "@material-ui/core";
import React from "react";
import {Visibility, VisibilityOff} from "@material-ui/icons";

const Input = ({half, name, label, handleChange, autoFocus, handleShowPassword, handleShowCPassword, type}) => {
    return(
        <>
            <Grid item xs={12} sm={half?6:12}>
                <TextField
                    name = {name}
                    variant="outlined"
                    label={label}
                    onChange={handleChange}
                    autoFocus={autoFocus} xs={6}
                    required
                    fullWidth
                    type={type}
                    InputProps={(name==="password" || name==="confirmPassword")?{
                        endAdornment:(
                            <InputAdornment position={"end"}>
                                <IconButton
                                    onClick={handleShowPassword || handleShowCPassword}
                                >
                                    {type==="password"?<VisibilityOff />:<Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }:null}
                />
            </Grid>

        </>
    )
}

export default Input