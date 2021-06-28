import React from "react";
import styled from "styled-components";
import ImgSlider from "./imgSlider";
import Viewers from "./Viewers";

function Home() {
	return (
		<Container>
			<ImageContainer>
				<ImgSlider />
				<Viewers />
			</ImageContainer>
		</Container>
	);
}

export default Home;

const Container = styled.main`
	min-height: 100vh;
	position: relative;
	&:before {
		background: url("/images/home-background.png") center center / cover
			no-repeat fixed;
		content: "";
		position: absolute;
		top: 0%;
		left: 0%;
		right: 0%;
		bottom: 0%;
		padding: 50%;
		z-index: -1;
	}
`;
const ImageContainer = styled.div`
	position: relative;
	min-height: 100vh;
	min-width: calc(100vw-10px);
	padding: 0 calc(3.5vw + 5px);
	overflow-x: hidden;
	overflow-y: hidden;
`;
