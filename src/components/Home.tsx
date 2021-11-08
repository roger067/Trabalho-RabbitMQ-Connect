import { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

import InfoCard from "./InfoCard";
import Flex from "./Flex";
import api from "../utils/api";
import Input from "./Input";
import Button from "./Button";

type User = {
  avatar_url: "https://avatars.githubusercontent.com/u/41485238?v=4";
  bio: "Front-End Developer & \r\njavascript enthusiast.";
  login: "roger067";
  name: "Rogério de Moura";
  url: "https://api.github.com/users/roger067";
};

type Logs = {
  quantity: number;
  value: number;
  broker: string;
  date: Date;
  brokerVd: string;
  brokerCp: string;
  service: 1 | 2;
  type: "compra" | "venda";
};

const Home: React.FC = () => {
  const [viggo, setViggo] = useState<User>();
  const [roger, setRoger] = useState<User>();
  const [logs, setLogs] = useState<Logs[]>();
  const [isLoading, setIsLoading] = useState(true);

  const [broker, setBroker] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [service, setService] = useState<number>();

  useEffect(() => {
    const fetchData = async (
      user: string,
      setUser: React.Dispatch<React.SetStateAction<User | undefined>>
    ) => {
      try {
        const { data }: { data: User } = await api.get(
          `https://api.github.com/users/${user}`
        );

        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData("roger067", setRoger);
    fetchData("theviggo", setViggo);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data }: { data: Logs[] } = await api.get(`/logs`);

        setLogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      await api.post("/transaction", {
        broker,
        value: Number(value),
        quantity: Number(quantity),
        service: Number(service),
      });
      toast.success("Transação realizada com sucesso! Verifique o terminal");

      setTimeout(async () => {
        const { data }: { data: Logs[] } = await api.get(`/logs`);
        setLogs(data);
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao fazer transação!");
    }
  };

  return (
    <Flex padding="30px">
      <Flex flexDirection="column" mr="40px">
        <InfoCard
          avatar={roger?.avatar_url}
          name={roger?.name}
          login={roger?.login}
          url={roger?.url}
          bio={roger?.bio}
        />
        <InfoCard
          avatar={viggo?.avatar_url}
          name={viggo?.name}
          login={viggo?.login}
          url={viggo?.url}
          bio={viggo?.bio}
        />
      </Flex>

      <Flex flexDirection="column" width="100%">
        <H1>Corretora de Valores</H1>
        <Flex>
          <form
            onSubmit={onSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <label>Corretora</label>
            <Input value={broker} onChange={(e) => setBroker(e.target.value)} />
            <label>Valor</label>
            <Input value={value} onChange={(e) => setValue(e.target.value)} />
            <label>Quantidade</label>
            <Input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <label>Tipo de serviço</label>
            <Flex mt="4px" mb="16px">
              <ChoiceButton
                onClick={() => setService(1)}
                active={service === 1}
              >
                Compra
              </ChoiceButton>
              <ChoiceButton
                onClick={() => setService(2)}
                active={service === 2}
              >
                Venda
              </ChoiceButton>
            </Flex>
            <Button onClick={onSubmit}>Enviar</Button>
          </form>
          <Flex ml="32px" flexDirection="column" width="100%">
            {isLoading ? (
              <span>Carregando...</span>
            ) : (
              <Card>
                <Table>
                  <thead>
                    <tr>
                      <th>Corretora</th>
                      <th>Valor</th>
                      <th>Quantidade</th>
                      <th>Serviço</th>
                      <th>timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs?.map((log, index) => (
                      <tr key={`${log.broker}-${index}`}>
                        <td>
                          <b>{log.broker}</b>
                        </td>
                        <td>{log.value}</td>
                        <td>{log.quantity}</td>
                        <td>{log.type}</td>
                        <td>
                          {new Date(log.date).toLocaleDateString("pt-BR")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const H1 = styled.h1`
  color: #0a1931;
  margin-top: 0;
`;

const ChoiceButton = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: ${(props) => (props.active ? "#fff" : "#1e3163")};
  border: 1px solid #1e3163;
  background-color: ${(props) => (props.active ? "#1e3163" : "#dae2f8")};
  height: 40px;
  font-weight: 600;
  font-size: 14px;
  border-radius: 24px;
  cursor: pointer;

  &:active,
  &:focus {
    background-color: #1e3163;
  }

  &:first-child {
    margin-right: 8px;
  }

  &:last-child {
    margin-left: 8px;
  }
`;

const Table = styled.table`
  width: 100%;
  border: 0;
  border-collapse: separate;
  border-spacing: 0;

  th {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid #1e3163;
    background: #ecedf0;
    color: #1e3163;
    font-size: 14px;
    font-weight: bold;
  }

  tr {
    color: #1e3163;
  }

  td {
    padding: 16px 8px;
    font-size: 14px;
    background: #fff;
    font-size: 16px;

    b {
      color: #1e3163;
    }
  }
`;

const Card = styled.div`
  margin-top: 16px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: rgba(60, 66, 87, 0.12) 0px 7px 14px 0px,
    rgba(0, 0, 0, 0.12) 0px 3px 6px 0px;
`;

export default Home;
