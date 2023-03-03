import React from "react"
import { Typography, TextField, Box, Radio, Button, Stack, Switch } from "@mui/material"
import { filterAndSortObject as sort } from "@utils/sortAndFilter"
import { useDispatch } from "react-redux";
import { setFilter } from "@redux/filterSlice";

const  Filter = ({ 
    search, 
    handleClick,
    handleChange, 
    form,
    desc,
    setDesc 
}) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, watch } = form;
    const watchSortBy = watch("sortBy");
    const watchFilterBy = watch("filterBy");

    const resetData = () => {
        const resetToEmpty = formValue => Object.keys(formValue).forEach((key) => formValue[key] = "");
        reset(resetToEmpty);
        setDesc(false);
        dispatch(setFilter(null));
    }

    const handleToggleDesc = () => setDesc(prevState => !prevState);

    const cleanFilterData = data => {
        if (!data.sortBy && !data.filterBy) {
            return null;
        }
        if (watchFilterBy !== sort.filterBy.author.value) {
            delete data?.authorName;
        }
        if (watchFilterBy !== sort.filterBy.dateInterval.value) {
            delete data?.beginDate;
            delete data?.endDate;
        }
        return data;
    }

    const onSubmit = data => {
        data = cleanFilterData(data)
        dispatch(setFilter({ ...data, desc }));
    }

    return (
        <>
            <Typography variant='h6' mb={1}>
                Search & Filter
            </Typography>
            <Box variant="div" mb={1}>
                <Typography variant='subtitle2'>
                    Search
                </Typography>
                <TextField
                    type="text"
                    value={search}
                    onChange={handleChange}
                    autoComplete="off"
                    size='small'
                    onKeyDown={handleClick}
                    fullWidth
                    placeholder='Press "Enter"'
                />
            </Box>
            <Box variant="div" mb={1}>
                <Box variant="div" sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant='subtitle2'>
                        Sort By
                    </Typography>
                    <Box variant="div">
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Switch 
                                size="small"
                                checked={desc}
                                onChange={handleToggleDesc}
                            />
                            <Typography variant="caption" >Desc</Typography>
                        </Stack>
                    </Box>
                </Box>
                {Object.values(sort.sortBy).map(value => (
                    <Box variant="div">
                        <Radio 
                            sx={{ pl: 0, py: 0.5 }}
                            size="small"
                            { ...register("sortBy") }
                            value={value.value}
                            checked={watchSortBy === value.value} 
                        />
                        <Typography variant="caption">{value.label}</Typography>
                    </Box>
                ))}
            </Box>
            <Box variant="div" mb={1}>
                <Typography variant='subtitle2'>
                    Filter By
                </Typography>
                <Box variant="div">
                    <Radio 
                        sx={{ pl: 0, py: 0.5 }}
                        size="small"
                        { ...register("filterBy") }
                        value={sort.filterBy.author.value} 
                        checked={watchFilterBy === sort.filterBy.author.value}
                    />
                    <Typography variant="caption">{sort.filterBy.author.label}</Typography>
                </Box>
                {
                    watchFilterBy === sort.filterBy.author.value && (
                        <Box variant="div">
                            <TextField 
                                { ...register('authorName', { required: true }) }
                                label="author"
                                fullWidth
                                size="small"    
                            />
                        </Box>
                    )
                }
                <Box variant="div">
                    <Radio 
                        sx={{ pl: 0, py: 0.5 }}
                        size="small"
                        { ...register("filterBy") }
                        value={sort.filterBy.dateInterval.value} 
                        checked={watchFilterBy === sort.filterBy.dateInterval.value}
                    />
                    <Typography variant="caption">{sort.filterBy.dateInterval.label}</Typography>
                </Box>
                {
                    watchFilterBy === sort.filterBy.dateInterval.value && (
                        <Box variant="div">
                            <TextField
                                type="date"
                                { ...register("beginDate", { required: true }) }
                                label="Begin"
                                size="small" 
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                sx={{ mb: 1 }}    
                            /><br></br>
                            <TextField
                                type="date"
                                { ...register("endDate", { required: true }) }
                                label="End" 
                                InputLabelProps={{ shrink: true }} 
                                size="small"  
                                fullWidth 
                            />
                        </Box>
                    )
                }
                <Box variant="div" display="flex" justifyContent="space-between" mt={2}>
                    <Button 
                        size="small" 
                        variant="outlined"
                        onClick={resetData}
                    >
                        Reset
                    </Button>
                    <Button 
                        variant="contained" 
                        size="small" 
                        color="success"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Apply
                    </Button>
                </Box>
            </Box>
        </>
    )
} 

export default Filter;