import { Box, Button, MenuItem, Select, TextField, Grid, useMediaQuery } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Header from "../../components/Header";
import TaskCard from "../../components/TaskCard";
import CreateTask from "../../components/CreateTaskDialog";
import { Droppable } from "react-beautiful-dnd";
import { fetchTasksData } from "../../actions/TaskDataAction";
import { DragDropContext } from 'react-beautiful-dnd';
import { updateTask } from "../../services/api";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const [filterValue, setFilterValue] = useState(0);
    const [isCreateTaskModalOpen, setCreateTaskModal] = useState(false);
    const openCreateTaskModal = () => setCreateTaskModal(true);
    const closeCreateTaskModal = () => setCreateTaskModal(false);
    let tasksData = useSelector((state) => state.tasksData);
    let [todos, setTodos] = useState([]);
    let [inProcess, setInProcess] = useState([]);
    let [completed, setCompleted] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        let userId = localStorage.getItem('userId');
        dispatch(fetchTasksData(userId));
    }, []);

    useEffect(() => {
        let filteredTasks = tasksData?.tasks.filter(task =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const todos = filteredTasks.filter(task => task.column === 0);
        const inprocess = filteredTasks.filter(task => task.column === 1);
        const completed = filteredTasks.filter(task => task.column === 2);

        setTodos(todos);
        setInProcess(inprocess);
        setCompleted(completed);
    }, [tasksData.tasks, searchTerm]);

    const handleChange = (e) => {
        console.log(e.target.value);
        setFilterValue(e.target.value);

        if (e.target.value != -1) {
            const filteredTasks = tasksData?.tasks.filter((task) => {
                const createdAt = new Date(task.createdAt.split('T')[0]);
                const taskDeadline = new Date(task.taskDeadline);
                const differenceInTime = taskDeadline - createdAt;
                const differenceInDays = differenceInTime / (1000 * 3600 * 24);
                return differenceInDays === e.target.value;
            });

            const todos = filteredTasks.filter(task => task.column === 0);
            const inprocess = filteredTasks.filter(task => task.column === 1);
            const completed = filteredTasks.filter(task => task.column === 2);

            setTodos(todos);
            setInProcess(inprocess);
            setCompleted(completed);
        } else {
            let filteredTasks = tasksData?.tasks.filter(task =>
                task.title.toLowerCase().includes(searchTerm.toLowerCase())
            );

            const todos = filteredTasks.filter(task => task.column === 0);
            const inprocess = filteredTasks.filter(task => task.column === 1);
            const completed = filteredTasks.filter(task => task.column === 2);

            setTodos(todos);
            setInProcess(inprocess);
            setCompleted(completed);
        }
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;
        if (source.droppableId == destination.droppableId && source.index == destination.index) return;

        let add, tempTodos = todos, tempInProcess = inProcess, tempCompleted = completed;
        if (source.droppableId === 'todoslist') {
            add = tempTodos[source.index];
            tempTodos.splice(source.index, 1);
        } else if (source.droppableId === 'inprocesslist') {
            add = tempInProcess[source.index];
            tempInProcess.splice(source.index, 1);
        } else {
            add = tempCompleted[source.index];
            tempCompleted.splice(source.index, 1);
        }

        if (destination.droppableId === 'todoslist') {
            tempTodos.splice(destination.index, 0, add);
            updateTask(add._id, {
                column: 0,
            })
        } else if (destination.droppableId === 'inprocesslist') {
            tempInProcess.splice(destination.index, 0, add);
            updateTask(add._id, {
                column: 1,
            })
        } else {
            tempCompleted.splice(destination.index, 0, add);
            updateTask(add._id, {
                column: 2,
            })
        }

        setTodos(tempTodos);
        setInProcess(tempInProcess);
        setCompleted(tempCompleted);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
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
                        onClick={openCreateTaskModal}
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

                                onChange={(e) => setSearchTerm(e.target.value)}
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
                                <MenuItem value={-1}>Clear</MenuItem>
                                <MenuItem value={1}>1 day left</MenuItem>
                                <MenuItem value={3}>2 day left</MenuItem>
                                <MenuItem value={3}>3 day left</MenuItem>
                                <MenuItem value={4}>4 day left</MenuItem>
                                <MenuItem value={5}>5 day left</MenuItem>
                                <MenuItem value={6}>6 day left</MenuItem>
                                <MenuItem value={7}>7 day left</MenuItem>
                                <MenuItem value={8}>8 day left</MenuItem>
                            </Select>

                        </Box>
                    </Box>
                    <Box mt='2rem'>
                        <Grid container spacing={3} direction={isMobile ? 'column' : 'row'}>
                            <Grid item xs={4} >
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
                                    <Droppable droppableId="todoslist">
                                        {
                                            (provided) => (
                                                <Box width='100%' height='100%' mt='1rem' pr='0.5rem' scrollBehavior='auto' overflow='auto' ref={provided.innerRef} {...provided.droppableProps}>
                                                    {todos.map((task, index) => (
                                                        <TaskCard key={task._id} task={task} taskType='todo' index={index} />
                                                    ))}
                                                    {provided.placeholder}
                                                </Box>
                                            )
                                        }
                                    </Droppable>
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
                                    <Droppable droppableId="inprocesslist">
                                        {
                                            (provided) => (
                                                <Box width='100%' height='100%' mt='1rem' pr='0.5rem' scrollBehavior='auto' overflow='auto' ref={provided.innerRef} {...provided.droppableProps}>
                                                    {inProcess.map((task, index) => (
                                                        <TaskCard key={task._id} task={task} taskType='inprocess' index={index} />
                                                    ))}
                                                    {provided.placeholder}
                                                </Box>
                                            )
                                        }
                                    </Droppable>
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
                                    <Droppable droppableId="completedlist">
                                        {
                                            (provided) => (
                                                <Box width='100%' height='100%' mt='1rem' pr='0.5rem' scrollBehavior='auto' overflow='auto' ref={provided.innerRef} {...provided.droppableProps}>
                                                    {completed.map((task, index) => (
                                                        <TaskCard key={task._id} task={task} taskType='completed' index={index} />
                                                    ))}
                                                    {provided.placeholder}
                                                </Box>
                                            )
                                        }
                                    </Droppable>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box >
                {isCreateTaskModalOpen && <CreateTask isOpen={openCreateTaskModal} onClose={closeCreateTaskModal} />}
            </Box >
        </DragDropContext >
    );
};

export default Dashboard;
