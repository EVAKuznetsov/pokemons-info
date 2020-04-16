import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import styles from './Loader.module.sass'

const Loader = () => {
	return (
		<div className={styles.wrap}>
			<CircularProgress />
		</div>
	)
}

export default Loader
