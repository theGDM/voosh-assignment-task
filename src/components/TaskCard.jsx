import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import task from '../assets/task.png';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

export default function TaskCard() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    return (
        <Card sx={{ width: '100%', backgroundColor: colors.primary[400], mb: '1rem' }}>
            <CardContent>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography gutterBottom fontSize='1.5rem' component="div">
                        Going to market
                    </Typography>
                    <DragIndicatorIcon style={{ fontSize: '2rem', cursor: 'grab' }} />
                </Box>
                <Typography fontSize='1.3rem' color={colors.primary[200]}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque ipsum autem debitis rerum omnis tempore repellat laborum, soluta, sit et similique quidem tempora ab quaerat at labore alias, quisquam maiores?
                </Typography>
            </CardContent>
            <CardActions>
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
                >
                    Details
                </Button>
                <Button
                    type="button"
                    variant="contained"
                    sx={{
                        mt: '1rem',
                        mb: '1rem',
                        backgroundColor: colors.blueAccent[500],
                        "&:hover": {
                            backgroundColor: colors.blueAccent[600], // Set your desired hover color
                        },
                        fontSize: '1.2rem',
                        borderRadius: '0',
                    }}
                >
                    Edit
                </Button>
                <Button
                    type="button"
                    variant="contained"
                    sx={{
                        mt: '1rem',
                        mb: '1rem',
                        backgroundColor: colors.redAccent[500],
                        "&:hover": {
                            backgroundColor: colors.redAccent[600], // Set your desired hover color
                        },
                        fontSize: '1.2rem',
                        borderRadius: '0',
                    }}
                >
                    Delete
                </Button>
            </CardActions>
        </Card>

    );
}