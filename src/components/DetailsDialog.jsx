import React from 'react';
import { Box, Button, Typography } from "@mui/material";
import Modal from 'react-modal';
import { useTheme } from '@emotion/react';
import { tokens } from '../theme';

export default function DetailsDialog({ isOpen, onClose, task }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const modalStyle = {
        content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30%',
            height: '80%',
            backgroundColor: colors.primary[400],
            borderRadius: '1rem',
            boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.8)',
            overflow: 'auto',
            padding: '1rem',
            background: "#000000"
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            sx={{ position: 'relative' }}
            onRequestClose={onClose}
            contentLabel='Job Details Information'
            style={modalStyle}
        >
            <Box
                width='100%'
                p='0.5rem 1rem'
                display='flex'
                justifyContent='center'
                alignItems='center'
            >
                <Typography
                    color='#000'
                    fontSize='1.8rem'
                    lineHeight='1.6'
                    color={colors.greenAccent[500]}
                >
                    Task Details
                </Typography>
            </Box>
            <Box height='0.1rem' bgcolor={colors.greenAccent[500]}>

            </Box>
            <Box
                display='flex'
                flexDirection='column'
                justifyContent='start'
                p='0.5rem 1rem'
                height='75%'
                maxWidth='100%'
            >
                <Box display='inline'>
                    <Typography
                        fontWeight='400'
                        lineHeight='1.5'
                        fontSize='1.6rem'
                        display='inline'
                    >
                        Title:&nbsp;
                    </Typography>
                    <Typography
                        color='rgb(77, 89, 106)'
                        fontWeight='300'
                        fontSize='1.6rem'
                        display='inline'
                    >
                        {task.title}
                    </Typography>
                </Box>
                <Box display='inline'>
                    <Typography
                        fontWeight='400'
                        lineHeight='1.5'
                        fontSize='1.6rem'
                        display='inline'
                    >
                        Description:&nbsp;
                    </Typography>
                    <Typography
                        color='rgb(77, 89, 106)'
                        fontWeight='300'
                        fontSize='1.6rem'
                        display='inline'
                    >
                        {task.description}

                    </Typography>
                </Box>
                <Box display='flex' alignItems='start'>
                    <Typography
                        fontWeight='400'
                        lineHeight='1.5'
                        fontSize='1.6rem'
                        display='inline'
                    >
                        Creation Date:&nbsp;
                    </Typography>
                    <Typography
                        color='rgb(77, 89, 106)'
                        fontWeight='300'
                        fontSize='1.6rem'
                        display='inline'
                    >
                        {task.createdAt.split('T')[0]}
                    </Typography>
                </Box>
                <Box display='flex' alignItems='start'>
                    <Typography
                        fontWeight='400'
                        lineHeight='1.5'
                        fontSize='1.6rem'
                        display='inline'
                    >
                        Task Deadline:&nbsp;
                    </Typography>
                    <Typography
                        color='rgb(77, 89, 106)'
                        fontWeight='300'
                        fontSize='1.6rem'
                        display='inline'
                    >
                        {task.taskDeadline}
                    </Typography>
                </Box>
            </Box>
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
                    position: 'absolute',
                    right: '1rem',
                    bottom: 0
                }}
                onClick={onClose}
            >
                Close
            </Button>
        </Modal >
    );
}
