import React,{useState} from '../../node_modules/react';
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '../../node_modules/@material-ui/core';
import LockOutlinedIcon from '../../node_modules/@material-ui/icons/LockOutlined';
import withStyles from '../../node_modules/@material-ui/core/styles/withStyles';
import { Link, withRouter } from '../../node_modules/react-router-dom';
import firebase from '../components/firebase';
import API from "../utils/API";


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
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', 
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
})

function CreateChallenge(props) {
	const { classes } = props

	// I'm produce state using useState.
	// The second parameter that will keep the first parameter value will change the value.
	const [name, setName] = useState('')
	const [duration, setDuration] = useState('')
	const [unitCost, setUnitCost] = useState('')
	const [currency, setCurrency] = useState('')
	const [rules, setRules] = useState('')
	

	//When the form is submitted it will run
	function onSubmit(e){
		e.preventDefault()//blocks the postback event of the page
		// console.log('email: '+email)
		// console.log('password: '+password)
		// console.log('name: '+name)
	}

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				{/* <Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar> */}
				<Typography component="h1" variant="h5">
					New Challenge
       			</Typography>
				<form className={classes.form} onSubmit={onSubmit}>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="name">Name</InputLabel>
						{/* When the name field is changed, setName will run and assign the name to the value in the input. */}
						<Input id="name" name="name" autoComplete="off" autoFocus value={name} onChange={e => setName(e.target.value)}  />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="duration">Duration </InputLabel>
						{/* When the e-mail field is changed, setEmail will run and assign the e-mail to the value in the input. */}
						<Input id="duration" name="duration" autoComplete="on" value={duration} onChange={e => setDuration(e.target.value)}   />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="unitCost">Unit Cost</InputLabel>
						{/* When the password field is changed, setPassword will run and assign the password to the value in the input. */}
						<Input name="unitCost" id="password" autoComplete="on" value={unitCost} onChange={e => setUnitCost(e.target.value)}  />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="currency">Currency</InputLabel>
						{/* When the password field is changed, setPassword will run and assign the password to the value in the input. */}
						<Input name="currency" id="currency" autoComplete="on" value={currency} onChange={e => setCurrency(e.target.value)}  />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="rules">Rules</InputLabel>
						{/* When the password field is changed, setPassword will run and assign the password to the value in the input. */}
						<Input name="rules" id="rules" autoComplete="on" value={rules} onChange={e => setRules(e.target.value)}  />
					</FormControl>
					{/* <FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="group">Your group</InputLabel> */}
						{/* When the group field is changed, setgroup will run and assign the group to the value in the input. */}
						{/* <Input name="group" type="text" id="group" autoComplete="off" value={group} onChange={e => setGroup(e.target.value)}  />
					</FormControl> */}

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={create}
						className={classes.submit}>
						Create
          			</Button>

					<Button
						type="submit"
						fullWidth
						variant="text"
						color="primary"
						component={Link}
						to="/dashboard"
						className={classes.submit}>
						Cancel
          			</Button>
				</form>
			</Paper>
		</main>
	)

	async function create(){
		console.log(name)
		console.log(duration)
		console.log(unitCost)
		console.log(currency)
		console.log(rules)

		API.createChallenge({
			name: name,
			duration: duration,
			unitCost: unitCost,
			currency: currency,
			rules: rules
		})
	}
};

export default withRouter(withStyles(styles)(CreateChallenge));