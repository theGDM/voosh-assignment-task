import { Box, Button, InputLabel, MenuItem, Select } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from "../../components/header";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // const user = localStorage.getItem("userEmail");
        // if (!user) navigate("/");

        (async () => {

        })();
    }, []);


    return (
        <Box width='100vw' height='100vh'>
            <Header />
            <Box>
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
                    onClick={{}}
                >
                    Login
                </Button>
            </Box>
        </Box>
    );
};

export default Dashboard;
