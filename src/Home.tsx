import { styled } from '@stitches/react';
import React, { FC } from 'react';
import GradientImage from './mania.jpg';
import New from './royal.jpg';
const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
});

const BigHeading = styled('h1', {
  fontWeight: '800',
  textTransform: 'capitalize',
  letterSpacing: '-.05em',
  fontSize: '3.75rem',
  textAlign: 'center',
  zIndex: '1',
  color: 'rgb(255 255 255 / 80%)',
});

const Paragraph = styled('p', {
  zIndex: '2',
  letterSpacing: '-.02em',
  fontSize: '2.5rem',
  fontWeight: 800,
  marginTop: '1.5rem',
});

const GradientAnimation = styled('svg', {
  position: 'absolute',
  opacity: 0.2,
});

const Span = styled('span', {
  background: 'linear-gradient(90deg, #007CF0 ,#00DFD8)',
  '-webkit-background-clip': 'text',
  '-webkit-text-fill-color': 'transparent',
});

const Gradient = styled('img', {
  position: 'absolute',
  width: 'calc(100% - 70px)',
  height: 'calc(100% - 70px)',
  borderRadius: '1rem',
});

const BackgroundAnimation: FC = () => {
  return (
    <GradientAnimation
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="absolute w-full h-full top-0 left-0 hue-rotate-180 dark:opacity-20 opacity-30 pointer-events-none overflow-visible"
    >
      <defs>
        <radialGradient
          id="Gradient1"
          cx="50%"
          cy="50%"
          fx="10%"
          fy="50%"
          r=".5"
        >
          <animate
            attributeName="fx"
            dur="34s"
            values="0%;3%;0%"
            repeatCount="indefinite"
          ></animate>
          <stop offset="0%" stopColor="#ff0"></stop>
          <stop offset="100%" stopColor="#ff00"></stop>
        </radialGradient>
        <radialGradient
          id="Gradient2"
          cx="50%"
          cy="50%"
          fx="10%"
          fy="50%"
          r=".5"
        >
          <animate
            attributeName="fx"
            dur="23.5s"
            values="0%;3%;0%"
            repeatCount="indefinite"
          ></animate>
          <stop offset="0%" stopColor="#9EFF00"></stop>
          <stop offset="100%" stopColor="#0ff0"></stop>
        </radialGradient>
        <radialGradient
          id="Gradient3"
          cx="50%"
          cy="50%"
          fx="50%"
          fy="50%"
          r=".5"
        >
          <animate
            attributeName="fx"
            dur="21.5s"
            values="0%;3%;0%"
            repeatCount="indefinite"
          ></animate>
          <stop offset="0%" stopColor="#f0f"></stop>
          <stop offset="100%" stopColor="#f0f0"></stop>
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient1)">
        <animate
          attributeName="x"
          dur="20s"
          values="25%;0%;25%"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="y"
          dur="21s"
          values="0%;25%;0%"
          repeatCount="indefinite"
        ></animate>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="17s"
          repeatCount="indefinite"
        ></animateTransform>
      </rect>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient2)">
        <animate
          attributeName="x"
          dur="23s"
          values="-25%;0%;-25%"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="y"
          dur="24s"
          values="0%;50%;0%"
          repeatCount="indefinite"
        ></animate>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="18s"
          repeatCount="indefinite"
        ></animateTransform>
      </rect>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient3)">
        <animate
          attributeName="x"
          dur="25s"
          values="0%;25%;0%"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="y"
          dur="26s"
          values="0%;25%;0%"
          repeatCount="indefinite"
        ></animate>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="360 50 50"
          to="0 50 50"
          dur="19s"
          repeatCount="indefinite"
        ></animateTransform>
      </rect>
    </GradientAnimation>
  );
};

const Home = () => {
  return (
    <Container>
      <BigHeading>
        Annotate your python code <br />
        on the fly
      </BigHeading>
      <Paragraph>commit. verify. ship.</Paragraph>
      {/* <Gradient src={New} alt="gradient" /> */}
      <BackgroundAnimation />
    </Container>
  );
};

export default Home;
