import React,{useState} from 'react';
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../firebase';
import API from '../../utils/API';


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

function Register(props) {
	const { classes } = props

	// I'm produce state using useState.
	// The second parameter that will keep the first parameter value will change the value.
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')

	//When the form is submitted it will run
	function onSubmit(e){
		e.preventDefault()//blocks the postback event of the page
		console.log('email: '+email)
		console.log('password: '+password)
		console.log('name: '+name)
	}

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Register Account
       			</Typography>
				<form className={classes.form} onSubmit={onSubmit}>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="name">Name</InputLabel>
						{/* When the name field is changed, setName will run and assign the name to the value in the input. */}
						<Input id="name" name="name" autoComplete="off" autoFocus value={name} onChange={e => setName(e.target.value)}  />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Email </InputLabel>
						{/* When the e-mail field is changed, setEmail will run and assign the e-mail to the value in the input. */}
						<Input id="email" name="email" autoComplete="on" value={email} onChange={e => setEmail(e.target.value)}   />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Password</InputLabel>
						{/* When the password field is changed, setPassword will run and assign the password to the value in the input. */}
						<Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)}  />
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
						onClick={onRegister}
						className={classes.submit}>
						Register
          			</Button>

					<Button
						type="submit"
						fullWidth
						variant="text"
						color="primary"
						component={Link}
						to="/login"
						className={classes.submit}>
						Go back to Login
          			</Button>
				</form>
			</Paper>
		</main>
	)

	async function onRegister(){

		try{
			//The register in the Firebase class is running with useState data.
			firebase.register(name,email,password).then(firebaseObject =>{
				
				API.createUser({
					username:firebaseObject.user.displayName,
					email:firebaseObject.user.email,
					firebaseId:firebaseObject.user.uid
				}).then((err,results) =>{
					if(err){
						console.log(err)
					}
					props.history.replace('/dashboard')
				}
				)
			}
			)
			//If there are no errors, they are redirected to the dashboard page.
		}catch(err){
			//create an alert instantly error
			alert(err.message)
		}
	}
};

export default withRouter(withStyles(styles)(Register));