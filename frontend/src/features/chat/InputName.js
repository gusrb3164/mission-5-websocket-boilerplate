import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
	main: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100vw',
		minHeight: '100vh',
		maxHeight: '100vh',
		backgroundColor: '#e6fcf5',
	},
	sendButton: {
		background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
		boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
		marginBottom: '5%',
		marginLeft: '10%',
	},
	inputField: {
		backgroundColor: 'white',
	},
});

const InputName = () => {
	const [inputName, setInputName] = useState('');
	const classes = useStyles();
	const inputChangeMessage = (e) => {
		setInputName(e.target.value);
	};
	return (
		<>
			<Grid className={classes.main}>
				<TextField
					className={classes.inputField}
					label="채팅 닉네임"
					variant="outlined"
					size="small"
					value={inputName}
					onChange={inputChangeMessage}
				/>
				<Link
					to={`/chat/${inputName}`}
					style={{ textDecoration: 'none' }}
				>
					<Button
						className={classes.sendButton}
						variant="contained"
						color="primary"
						size="medium"
					>
						입장
					</Button>
				</Link>
			</Grid>
		</>
	);
};

export default InputName;
