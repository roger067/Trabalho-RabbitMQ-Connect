import styled from "styled-components";

const Button = styled.button`
  border: none;
  color: #fff;
  background-color: #185adb;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  margin-top: 16px;
  transition: all 200ms;

  &:hover {
    background-color: #0f2d69;
  }
`;

export default Button;
