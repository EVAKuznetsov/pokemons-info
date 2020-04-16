import React, { useState } from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import CachedIcon from '@material-ui/icons/Cached'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import { makeStyles } from '@material-ui/core/styles'

import Fab from '@material-ui/core/Fab'
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip'

const useSearchFieldStyles = makeStyles(() => ({
	input: {
		width: '400px',
		marginLeft: '10px',
	},
	clear: {
		flexGrow: 1,
		flexShrink: 0,
		height: '40px',
		width: '40px',
	},
}))

const SearchField = ({ onSearch }) => {
	const classes = useSearchFieldStyles()
	const [value, setValue] = useState('')

	const onChangeHandler = (e) => {
		setValue(e.target.value)
	}
	const ohSearchHandler = () => {
		if (value.trim().length > 0) {
			onSearch(value)
			setValue('')
		}
	}

	return (
		<FormControl className={classes.input} variant="filled">
			<InputLabel htmlFor="search-input">Search</InputLabel>
			<Input
				id="search-input"
				type={'text'}
				value={value}
				onChange={onChangeHandler}
				endAdornment={
					<InputAdornment position="end">
						{value && (
							<IconButton onClick={ohSearchHandler} aria-label="search" edge="end">
								<CachedIcon />
							</IconButton>
						)}
					</InputAdornment>
				}
			/>
		</FormControl>
	)
}
SearchField.propTypes = {
	onSearch: PropTypes.func.isRequired,
}
export default SearchField
