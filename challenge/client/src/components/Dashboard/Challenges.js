import React, { Component, Fragment } from 'react';
import { Typography, Paper, Avatar, Button } from '@material-ui/core';
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import MenuAppBar from '../components/Dashboard/AppBar';

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', 
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.primary.main,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
});

function Challenges(props) {
	const { classes } = props

	return (
		<main className={classes.main}>
			{/* <MenuAppBar /> */}
			<Paper className={classes.paper}>
				{/* <Avatar className={classes.avatar}>
					<VerifiedUserOutlined />
				</Avatar> */}
				<Typography component="h1" variant="h5">
					Challenges
				</Typography>
				<Button
					type="submit"
					fullWidth
					variant="outlined"
					color="primary"
					component={Link}
					to="/challenges_create"
					className={classes.submit}>
					Create
          		</Button>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					component={Link}
					to="/login"
					className={classes.submit}>
					Join
          		</Button>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					component={Link}
					to="/dashboard"
					className={classes.submit}>
					Cancel
          		</Button>
			</Paper>
		</main>
	)
};

export default withStyles(styles)(Challenges);