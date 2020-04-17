import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'

import PokemonType from '../PokemonType'
import TabPanel from './TabPanel'

const useStyles = makeStyles((theme) => ({
	root: {
		height: 300,
		flexGrow: 1,
		minWidth: 300,
		transform: 'translateZ(0)',
		'@media all and (-ms-high-contrast: none)': {
			display: 'none',
		},
	},
	modal: {
		display: 'flex',
		padding: theme.spacing(1),
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		width: '700px',
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	avatar: {
		height: '150px',
		marginRight: '20px',
	},
	name: {
		fontSize: '24px',
		fontWeight: '700',
	},
	types: {
		margin: '20px 0 15px 0',
	},
	listRoot: {
		maxHeight: '200px',
		position: 'relative',
		overflow: 'auto',
		width: '100%',
	},
	imagesWrap: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
	},
	tabBody: { width: '100%' },
	gridList: {
		width: '100%',
		flexWrap: 'nowrap',
		transform: 'translateZ(0)',
	},
	title: {
		color: '#eceef5',
		fontWeight: 'bold',
		textShadow: '1px -1px 1px #000',
	},
	titleBar: {
		background:
			'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
	},
}))

const PokemonModal = ({ modalState, modalActions }) => {
	const classes = useStyles()
	const { pokemon, open, images, value, unknownAvatar } = modalState
	const { onCloseHandler, handleChange } = modalActions
	const types =
		pokemon.types &&
		pokemon.types.map((type) => <PokemonType key={type.slot} type={type.type.name} />)
	if (!Object.keys(pokemon).length > 0) return null

	return (
		<Modal
			disablePortal
			disableEnforceFocus
			disableAutoFocus
			open={open}
			aria-labelledby="server-modal-title"
			aria-describedby="server-modal-description"
			className={classes.modal}
			onClose={onCloseHandler}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<div className={classes.paper}>
				<Grid container spacing={1}>
					<Grid item>
						<img
							className={classes.avatar}
							src={pokemon.avatar ? pokemon.avatar : unknownAvatar}
							alt="avatar"
						/>
					</Grid>
					<Grid item sm container direction="column">
						<Box className={classes.name}>{pokemon.name}</Box>
						<Box className={classes.types}>
							<b>Types:{types}</b>
						</Box>
						<Box marginBottom={2}>
							<b>height:</b> {pokemon.height}m <b>weight:</b> {pokemon.weight}kg
						</Box>
					</Grid>
				</Grid>
				<Grid container>
					<AppBar position="static" color="default">
						<Tabs
							value={value}
							onChange={handleChange}
							indicatorColor="primary"
							textColor="primary"
							variant="fullWidth"
						>
							<Tab label="stats" />
							<Tab label="images" />
						</Tabs>
					</AppBar>
					<TabPanel value={value} index={0} className={classes.tabBody}>
						<List disablePadding className={classes.listRoot}>
							{pokemon.stats.map((stat) => (
								<ListItem key={`${pokemon.id}-${stat.name_stat}`} divider>
									<span style={{ textTransform: 'capitalize' }}>{stat.name_stat}:</span>
									<b> {stat.base_stat}</b>
								</ListItem>
							))}
						</List>
					</TabPanel>
					<TabPanel value={value} index={1} className={classes.tabBody}>
						<div className={classes.imagesWrap}>
							{images.length > 0 ? (
								<GridList className={classes.gridList} cols={2.5}>
									{images.map((img) => (
										<GridListTile key={img.name}>
											<img src={img.url} alt={img.name} />
											<GridListTileBar
												title={img.name}
												classes={{
													root: classes.titleBar,
													title: classes.title,
												}}
											/>
										</GridListTile>
									))}
								</GridList>
							) : (
								<span>This pokemon has no photos</span>
							)}
						</div>
					</TabPanel>
				</Grid>
			</div>
		</Modal>
	)
}

PokemonModal.propTypes = {
	modalState: PropTypes.shape({
		pokemon: PropTypes.object,
		open: PropTypes.bool.isRequired,
		images: PropTypes.array,
		value: PropTypes.number,
		unknownAvatar: PropTypes.string.isRequired,
	}),
	modalActions: PropTypes.objectOf(PropTypes.func.isRequired),
}
export default PokemonModal
