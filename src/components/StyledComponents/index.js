import styled, { keyframes } from "styled-components";

const flyDown = keyframes`
  from {
    transform: translate(-50%, -60%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: inherit;
  }
`;

const appear = keyframes`
  from {
    transform: translateY(15%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const TheHeader = styled.header`
  position: sticky;
  top: 0;
`;

export const HeaderContainer = styled.div`
  margin: 0 auto;
  max-width: 1080px;
  padding: 1.45rem 1.0875rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const ModalBG = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  animation: ${fadeIn};
  animation-duration: 1s;
  animation-fill-mode: forwards;
`;

export const LoginModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-rows: 5px, auto, auto, auto, auto, auto, auto;
  grid-template-columns: auto;
  justify-items: center;
  width: 90%;
  max-width: 500px;
  padding: 30px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  background: white;
  animation: ${flyDown};
  animation-duration: 1s;
  animation-delay: 0.5s;
  animation-fill-mode: forwards;
  opacity: 0;
  background: white;
  z-index: 1000 important!;

  & * {
    margin-bottom: 10px;
  }
`;

export const ModalExit = styled.button`
  justify-self: right;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  color: white;
  font-weight: bold;
  border: 0;
  margin: -20px -20px 0 0;
  cursor: pointer;
`;

export const LoginButton = styled.button`
  width: 90%;
  height: 2rem;
  max-width: 250px;
  background: ${(props) =>
    props.disabled ? "lightgray" : props.inverse ? "white" : "var(--primary)"};
  color: ${(props) => (props.inverse ? "var(--primary)" : "white")};
  border: 0;
  border-radius: 5px;
`;

export const LoginInput = styled.input`
  width: 90%;
  height: 2.5rem;
  max-width: 350px;
  background: white;
  color: black;
  border: 1px solid lightgray;
  border-radius: 5px;
  text-align: center;
  font-size: 1.5rem;
`;

export const CardContainer = styled.div`
  width: 280px;
  height: 350px;
  justify-self: center;
  display: grid;
  grid-template-row: repeat(3, 1fr);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 5px 5px 15px var(--secondary);
  background: white;
  animation: ${appear};
  animation-duration: 0.4s;
  animation-delay: ${(props) => `${props.index * 0.1}s`};
  animation-timing-function: cubic-bezier(0.37, 0.22, 0.6, 1.92);
  animation-fill-mode: backwards;
  & * {
    margin: 0;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 2rem;
  background: ${(props) =>
    props.disabled
      ? "lightgray"
      : props.inClass
      ? "var(--secondary)"
      : "var(--primary)"};
  align-self: end;
  justify-self: center;
  color: ${(props) => (props.disabled ? "var(--secondary)" : "white")};
  border: 0;
  border-radius: 5px;
`;
