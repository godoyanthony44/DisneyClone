import React, { useEffect } from "react";
import styled from "styled-components";
import {
	selectUserName,
	selectUserPhoto,
	setUserLogin,
	setSignOut,
} from "../features/user/userSlice";
import { useSelector } from "react-redux";
import { auth, provider } from "../firebase";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Header() {
	const userName = useSelector(selectUserName);
	const userPhoto = useSelector(selectUserPhoto);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				dispatch(
					setUserLogin({
						name: user.displayName,
						email: user.displayEmail,
						photo: user.photoUrl,
					})
				);
				history.push("/");
			}
		});
	}, []);

	const SignIn = () => {
		auth.signInWithPopup(provider).then((result) => {
			let user = result.user;
			dispatch(
				setUserLogin({
					name: user.displayName,
					email: user.displayEmail,
					photo: user.photoUrl,
				})
			);
			history.push("/");
		});
	};
	const SignOut = () => {
		auth.signOut().then(() => {
			dispatch(setSignOut());
			history.push("/login");
		});
	};
	return (
		<Nav>
			<img id='logo' src='/images/logo.svg' />
			{!userName ? (
				<LoginContainer>
					<Login onClick={SignIn}>Login</Login>
				</LoginContainer>
			) : (
				<>
					<NavMenu>
						<a>
							<img src='/images/home-icon.svg' />
							<span>HOME</span>
						</a>

						<a>
							<img src='/images/search-icon.svg' />
							<span>SEARCH</span>
						</a>
						<a>
							<img src='/images/watchlist-icon.svg' />
							<span>WATCHLIST</span>
						</a>
						<a>
							<img src='/images/original-icon.svg' />
							<span>ORIGINALS</span>
						</a>
						<a>
							<img src='/images/movie-icon.svg' />
							<span>MOVIES</span>
						</a>
						<a>
							<img src='/images/series-icon.svg' />
							<span>SERIES</span>
						</a>

						<UserImg
							onClick={SignOut}
							id='Profile'
							src='https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/28834/square_thumb%402x.jpg'></UserImg>
					</NavMenu>
				</>
			)}
		</Nav>
	);
}

export default Header;

const Nav = styled.nav`
	height: 70px;
	background: #090b13;
	display: flex;
	align-items: center;
	padding: 0 36px;
`;

const Logo = styled.img``;

const NavMenu = styled.div`
	display: flex;
	margin-left: 25px;
	align-items: center;
	a {
		display: flex;
		align-items: center;
		padding: 0 12px;
		cursor: pointer;
		img {
			height: 20px;
		}

		span {
			font-size: 13px;
			letter-spacing: 1.42px;
			position: relative;

			&:after {
				content: "";
				height: 2px;
				background: white;
				position: absolute;
				left: 0;
				right: 0;
				bottom: -6px;
				opacity: 0;
				transform-origin: left center;
				transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
				transform: scaleX(0);
			}
		}
		&:hover {
			span:after {
				transform: scaleX(1);

				opacity: 1;
			}
		}
	}
`;

const UserImg = styled.img`
	width: 48px;
	height: 48px;
	border-radius: 50%;
	cursor: pointer;
	position: absolute;
	right: 10px;
`;

const Login = styled.div`
	border: 1px solid #f9f9f9;
	padding: 8px 16px;
	border-radius: 4px;
	letter-spacing: 1.5px;
	text-transform: uppercase;
	background-color: rgba(0, 0, 0, 0.6);
	transition: all 250ms ease 0s;
	cursor: pointer;

	&:hover {
		background-color: #f9f9f9;
		color: #000;
		border-color: transparent;
	}
`;
const LoginContainer = styled.div`
	display: flex;
	flex: 1;
	justify-content: flex-end;
`;

const SignOut = styled.div`
	border: 1px solid #f9f9f9;
	padding: 8px 16px;
	border-radius: 4px;
	letter-spacing: 1.5px;
	text-transform: uppercase;
	background-color: rgba(0, 0, 0, 0.6);
	transition: all 250ms ease 0s;
	cursor: pointer;

	&:hover {
		background-color: #f9f9f9;
		color: #000;
		border-color: transparent;
	}
`;
