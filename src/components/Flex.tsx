import styled from "styled-components";

interface FlexProps {
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
  minHeight?: string;
  flexDirection?: string;
  flex?: string;
  justifyContent?: string;
  alignItems?: string;
  alignSelf?: string;
  justifySelf?: string;
  wrap?: string;
  padding?: string;
  margin?: string;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
}

const Flex = styled.div<FlexProps>`
  display: flex;
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  max-width: ${(props) => props.maxWidth || "initial"};
  max-height: ${(props) => props.maxHeight || "initial"};
  min-width: ${(props) => props.minWidth || "initial"};
  min-height: ${(props) => props.minHeight || "initial"};
  flex-direction: ${(props) => props.flexDirection || "row"};
  flex: ${(props) => props.flex || "0 1 auto"};
  justify-content: ${(props) => props.justifyContent || "start"};
  align-items: ${(props) => props.alignItems || "auto"};
  align-self: ${(props) => props.alignSelf || "auto"};
  justify-self: ${(props) => props.justifySelf || "auto"};
  flex-wrap: ${(props) => props.wrap || "nowrap"};
  padding: ${(props) => props.padding || "0"};
  margin: ${(props) => props.margin || "0"};
  margin-top: ${(props) => props.mt || "0"};
  margin-bottom: ${(props) => props.mb || "0"};
  margin-left: ${(props) => props.ml || "0"};
  margin-right: ${(props) => props.mr || "0"};
`;

export default Flex;
