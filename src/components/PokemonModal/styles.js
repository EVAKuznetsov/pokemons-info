import { makeStyles } from '@material-ui/core/styles'

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
		maxWidth: '600px',
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	avatar: {
		height: '150px',
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
	tabPanel: {
		marginBottom: '10px',
	},
	tabsWrap: {
		marginTop: '20px',
	},
	imagesWrap: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
	},
	tabBody: {
		width: '100%',
	},
	gridList: {
		width: '100%',
		maxHeight: '200px',
		flexWrap: 'nowrap',
		transform: 'translateZ(0)',
	},
	imgFromList: {
		objectFit: 'cover',
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
export default useStyles
