import { Box, Button, MenuItem, Select, TextField, Grid } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Header from "../../components/Header";
import TaskCard from "../../components/TaskCard";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [filterValue, setFilterValue] = useState('');

    const handleChange = (e) => {
        setFilterValue(e.target.value);
    };

    return (
        <Box width='100vw' height='100vh' >
            <Header />
            <Box m='1.6rem' >
                <Button
                    type="button"
                    variant="contained"
                    sx={{
                        mt: '1rem',
                        mb: '1rem',
                        backgroundColor: colors.greenAccent[500],
                        "&:hover": {
                            backgroundColor: colors.greenAccent[600], // Set your desired hover color
                        },
                        fontSize: '1.2rem',
                        borderRadius: '0',
                    }}
                    onClick={{}}
                >
                    Add Task
                </Button>
                <Box height='5rem' bgcolor={colors.greenAccent[500]} display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' p='0 1rem'>
                    <Box display='flex' alignItems='center' >
                        <Typography fontSize='1.4rem' color={colors.primary[500]}>
                            Search:
                        </Typography>
                        <TextField
                            type="text"
                            sx={{
                                m: '0 1rem',
                                '& .MuiInputBase-input': {
                                    fontSize: '1.3rem', // Adjust the font size as needed
                                    height: '2rem', // Adjust the height of the text area
                                    padding: '0.8rem', // Adjust the padding as needed
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: colors.primary[400], // Default border color
                                    },
                                    '&:hover fieldset': {
                                        borderColor: colors.blueAccent[600], // Border color on hover
                                        borderWidth: '0.2rem'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: colors.blueAccent[600],// Border color when focused
                                        borderWidth: '0.2rem'
                                    },
                                },
                            }}
                        />

                    </Box>
                    <Box display='flex' alignItems='center' >
                        <Typography fontSize='1.4rem' color={colors.primary[500]}>
                            Sort By :
                        </Typography>
                        <Select
                            value={filterValue}
                            onChange={handleChange}

                            sx={{
                                m: '0 1rem',
                                fontSize: '1.3rem', // Adjust the font size for the selected item
                                width: '10rem',
                                height: '3.6rem',
                                color: 'white',
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: colors.primary[400],
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: colors.blueAccent[600],// Border color when focused
                                    borderWidth: '0.2rem'
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: colors.blueAccent[600],// Border color when focused
                                    borderWidth: '0.2rem'
                                },
                                '.MuiSvgIcon-root ': {
                                    borderColor: colors.primary[400], // Default border color
                                }
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        '& .MuiMenuItem-root': {
                                            fontSize: '1.3rem', // Adjust the font size for menu items
                                        }
                                    }
                                }
                            }}
                        >
                            <MenuItem value={10}>Recent</MenuItem>
                            <MenuItem value={20}>1 day left</MenuItem>
                            <MenuItem value={30}>2 day left</MenuItem>
                        </Select>

                    </Box>
                </Box>
                <Box mt='2rem'>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Box height='50rem'
                                bgcolor={colors.primary[400]}
                                display='flex'
                                alignItems='center'
                                flexDirection='column'
                                p='1rem 1.6rem'
                            >
                                <Box height='3.5rem' width='100%' bgcolor={colors.redAccent[400]} display='flex' justifyContent='center' alignItems='center'>
                                    <Typography fontSize='1.5rem' fontWeight='500' textAlign='center' color='white'>TODO</Typography>
                                </Box>
                                <Box height='100%' mt='1rem' pr='0.5rem' scrollBehavior='auto' overflow='auto'>
                                    <TaskCard />
                                    <TaskCard />
                                    <TaskCard />
                                    <TaskCard />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box height='50rem'
                                bgcolor={colors.primary[400]}
                                display='flex'
                                alignItems='center'
                                flexDirection='column'
                                scrollBehavior='auto'
                                p='1rem 1.6rem'
                            >
                                <Box height='3.5rem' width='100%' bgcolor='#20a7db' display='flex' justifyContent='center' alignItems='center'>
                                    <Typography fontSize='1.5rem' fontWeight='500' textAlign='center' color='white'>IN PROCESS</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box height='50rem'
                                bgcolor={colors.primary[400]}
                                display='flex'
                                alignItems='center'
                                flexDirection='column'
                                scrollBehavior='auto'
                                p='1rem 1.6rem'
                            >
                                <Box height='3.5rem' width='100%' bgcolor={colors.greenAccent[600]} display='flex' justifyContent='center' alignItems='center'>
                                    <Typography fontSize='1.5rem' fontWeight='500' textAlign='center' color='white'>COMPLETED</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box >
    );
};

export default Dashboard;
