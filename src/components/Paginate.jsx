import React from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab'
import { Link } from 'react-router-dom'

import useStyles from './styles'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../actions/posts';

const Paginate = ({page}) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect(() => {
        if(page) {
            dispatch(getPost())
        }
    }, [page])

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={5}
            page={1}
            variant="outlined"
            color='primary'
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
            )}
        />
    );
}

export default Paginate;