import React, { useEffect, useState } from "react"
import { Typography, TextField, Box, Radio, Button } from "@mui/material"
import { filterAndSortObject } from "@/utils/sortAndFilter"
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setFilter } from "@/redux/filterSlice";
import { useQueryClient } from "react-query";

const  Filter = ({ search, handleClick, handleChange, refetch  }) => {
    const sort = filterAndSortObject;
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, watch } = useForm();
    const watchSortBy = watch("sortBy");
    const watchFilterBy = watch("filterBy");

    const resetData = () => {
        const resetToEmpty = formValue => Object.keys(formValue).forEach((key) => formValue[key] = "");
        reset(resetToEmpty);
    }

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
        dispatch(setFilter(data));
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
                    placeholder='Press "Enter"'
                />
            </Box>
            <Box variant="div" mb={1}>
                <Typography variant='subtitle2'>
                    Sort By
                </Typography>
                <Box variant="div">
                    <Radio 
                        sx={{ pl: 0, py: 0.5 }}
                        size="small"
                        { ...register("sortBy") }
                        value={sort.sortBy.author.value}
                        checked={watchSortBy === sort.sortBy.author.value} 
                    />
                    <Typography variant="caption">{sort.sortBy.author.label}</Typography>
                </Box>
                <Box variant="div">
                    <Radio 
                        sx={{ pl: 0, py: 0.5 }}
                        size="small"
                        { ...register("sortBy") }
                        value={sort.sortBy.title.value} 
                        checked={watchSortBy === sort.sortBy.title.value}
                    />
                    <Typography variant="caption">{sort.sortBy.title.label}</Typography>
                </Box>
                <Box variant="div">
                    <Radio 
                        sx={{ pl: 0, py: 0.5 }}
                        size="small"
                        { ...register("sortBy") }
                        value={sort.sortBy.createdAt.value} 
                        checked={watchSortBy === sort.sortBy.createdAt.value}
                    />
                    <Typography variant="caption">{sort.sortBy.createdAt.label}</Typography>
                </Box>
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
                <Box variant="div">
                    <Radio 
                        sx={{ pl: 0, py: 0.5 }}
                        size="small"
                        { ...register("filterBy") }
                        value={sort.filterBy.articleWithUserComments.value} 
                        checked={watchFilterBy === sort.filterBy.articleWithUserComments.value}
                    />
                    <Typography variant="caption">{sort.filterBy.articleWithUserComments.label}</Typography>
                </Box>
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