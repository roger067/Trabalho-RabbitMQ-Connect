import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import Flex from "./Flex";

const InfoCard: React.FC<{
  avatar?: string;
  name?: string;
  bio?: string;
  login?: string;
  url?: string;
}> = ({ name, avatar, bio, login, url }) => (
  <Card>
    <img src={avatar} alt="avatar" />
    <Flex flexDirection="column">
      <Flex alignItems="center" mb="4px">
        <FontAwesomeIcon icon={faUserCircle} />
        <span>{name}</span>
      </Flex>
      <Flex alignItems="center">
        <FontAwesomeIcon icon={faGithub} />
        <a href={url} target="_blank" rel="noreferrer">
          {login}
        </a>
      </Flex>
      <p>{bio}</p>
    </Flex>
  </Card>
);

const Card = styled.div`
  display: flex;
  width: 360px;
  box-shadow: 4px 4px 7px rgba(65, 61, 61, 0.2);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;

  img {
    width: 30%;
    border-radius: 50%;
    margin-right: 24px;
  }

  span {
    font-weight: 600;
    color: #0a1931;
    font-size: 16px;
  }

  a {
    color: #57606a;
    text-decoration: none;
    font-size: 13px;
  }

  svg {
    margin-right: 8px;
  }

  p {
    margin-bottom: 0;
  }
`;

export default InfoCard;
