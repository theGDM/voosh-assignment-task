import React from "react";
import { Button, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import task from '../assets/task.png';
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const handleNavigation = (text) => {
        if (text == 'login') {
            navigate('/')
        } else {
            navigate('/register')
        }
    }

    return (
        <Box width='100vw' position='absolute' height='8vh' display='flex' flexDirection='row' alignItems='center' justifyContent='space-between' top='0' bgcolor={colors.primary[500]} p='0 10px' sx={{ boxShadow: "0.3rem 0.3rem 0.3rem rgba(0, 0, 0, 0.9)" }}>
            <img src={task} style={{ height: '80%' }} />
            <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center'>
                <Button
                    type="button"
                    variant="contained"
                    sx={{
                        mt: '0.3rem',
                        mb: '0.2rem',
                        backgroundColor: colors.greenAccent[500],
                        "&:hover": {
                            backgroundColor: colors.greenAccent[600], // Set your desired hover color
                        },
                        fontSize: '1.2rem'
                    }}
                    onClick={() => handleNavigation('login')}
                >
                    Login
                </Button>
                <Box width='1.5rem'></Box>
                <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center'>
                    <Button
                        type="button"
                        variant="contained"
                        sx={{
                            mt: '0.3rem',
                            mb: '0.2rem',
                            backgroundColor: colors.greenAccent[500],
                            "&:hover": {
                                backgroundColor: colors.greenAccent[600], // Set your desired hover color
                            },
                            fontSize: '1.2rem'
                        }}
                        onClick={() => handleNavigation('register')}
                    >
                        Signup
                    </Button>
                </Box>
            </Box>
        </Box >
    );
}