import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Button,
	Card,
	CardContent,
	CardActions,
	Grid,
	List,
	ListItem,
	ListItemText,
	TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { appendLog, selectLogs } from './chatSlice';
import { io } from 'socket.io-client';

const useStyles = makeStyles({
	sendButton: {
		background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
		boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
	},
	chatCard: {
		width: '100vw',
		minHeight: '100vh',
		maxHeight: '100vh',
		backgroundColor: '#e6fcf5',
	},
	dialogSection: {
		minHeight: '85vh',
		maxHeight: '85vh',
		overflowY: 'scroll',
	},
	inputSection: {
		padding: '0 0 0 0',
		minHeight: '15vh',
		maxHeight: '15vh',
	},
});
var socket = null;
export function Chat({ match }) {
	const classes = useStyles();
	const username = match.params.username;
	const logs = useSelector(selectLogs);
	const dispatch = useDispatch();
	const [inputMessage, setInputMessage] = useState('');

	const handleInputMessageChange = (event) => {
		setInputMessage(event.target.value);
	};
	useEffect(() => {
		socket = io({ path: '/socket' });
		socket.on('chat', (message) => {
			dispatch(appendLog(`${message}`));
		});

		socket.emit('chat', `${username}님이 입장하였습니다.`);
	}, [dispatch, match, username]);
	return (
		<Card className={classes.chatCard}>
			<CardContent className={classes.dialogSection}>
				<Grid item xs={12}>
					<List>
						{logs.map((log, index) => (
							<ListItem key={index}>
								<Grid container>
									<Grid item xs={12}>
										<ListItemText
											align={log.includes(username) ? 'right' : 'left'}
											primary={log}
										></ListItemText>
									</Grid>
								</Grid>
							</ListItem>
						))}
					</List>
				</Grid>
			</CardContent>
			<CardActions className={classes.inputSection}>
				<Grid container>
					<Grid item xs={9}>
						<TextField
							label="메시지"
							variant="outlined"
							size="small"
							value={inputMessage}
							onChange={handleInputMessageChange}
						/>
					</Grid>
					<Grid item xs={3}>
						<Button
							className={classes.sendButton}
							variant="contained"
							color="primary"
							size="medium"
							onClick={() => {
								dispatch(appendLog(`${username}: ${inputMessage}`));
								socket.emit('chat', `${username}: ${inputMessage}`);
								setInputMessage('');
							}}
						>
							전송
						</Button>
					</Grid>
				</Grid>
			</CardActions>
		</Card>
	);
}
