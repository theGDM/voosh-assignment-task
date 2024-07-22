import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import DetailsDialog from "./DetailsDialog";
import UpdateTask from "./UpdateTaskDialog";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { fetchTasksData } from "../actions/TaskDataAction";
import { deleteTask } from "../services/api";

export default function TaskCard({ task, taskType, index }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isDetailsModalOpen, setDetailsModal] = useState(false);
    const openDetailsModal = () => setDetailsModal(true);
    const closeDetailsModal = () => setDetailsModal(false);

    const [isEditModalOpen, setEditModal] = useState(false);
    const openEditModal = () => setEditModal(true);
    const closeEditModal = () => setEditModal(false);

    const getRemainingDays = (endDate, startDate) => {
        const d1 = new Date(startDate);
        const d2 = new Date(endDate);
        const diffTime = Math.abs(d2 - d1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays;
    }

    const handleDeleteTask = async () => {
        let userId = localStorage.getItem('userId');
        await deleteTask(task._id);
        dispatch(fetchTasksData(userId));
    }

    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided) => (
                <Box width='100%' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <Card sx={{ width: '100%', backgroundColor: colors.primary[400], mb: '1rem' }}>
                        <CardContent>
                            <Box display='flex' alignItems='center'>
                                <Typography gutterBottom fontSize='1.5rem' component="div">
                                    {task?.title}
                                </Typography>
                                {taskType != 'completed' ? <Typography gutterBottom fontSize='1.5rem' component="div" color={colors.greenAccent[200]} p='0 0.3rem'>
                                    ({getRemainingDays(task.taskDeadline, task.createdAt.split('T')[0])} days left)
                                </Typography> : <></>}
                            </Box>
                            <Typography fontSize='1.3rem' color={colors.primary[200]}>
                                {task?.description}
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
                                onClick={openDetailsModal}
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
                                onClick={openEditModal}
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

                                onClick={handleDeleteTask}
                            >
                                Delete
                            </Button>
                        </CardActions>
                        {isDetailsModalOpen && <DetailsDialog isOpen={openDetailsModal} onClose={closeDetailsModal} task={task} />}
                        {isEditModalOpen && <UpdateTask isOpen={openEditModal} onClose={closeEditModal} task={task} />}
                    </Card>
                </Box>

            )}

        </Draggable>


    );
}