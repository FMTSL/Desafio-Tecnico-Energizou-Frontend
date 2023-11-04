# Desafio Técnico - Energizou (Frontend)
Desafio técnico para vaga de Desenvolvedor Fullstack na Energizou.

## Descrição do Projeto

- Projeto realizado para candidatura na empresa Energizou, no qual foi imposto a criação de um sistema de cadastro para clientes utilizando o React.js para o Front-End. Foi determinada a criação de dois repositórios no Github para dividir a parte do Back e Front-End. Para acessar a parte de Back-end, feita em Node.js, clique [*Aqui*](https://github.com/FMTSL/Desafio-Tecnico-Energizou-Backend). 

- *Foi criado um CRUD para cadastro de empresas com os seguintes campos: Nome do Cliente, senha, nome da empresa, CNPJ, CEP, endereço, número, telefone e e-mail.*

## Tecnologias

- `React.js`
- `JavaScript`

## Execução

Foi realizada a instalação do `NPM` para que fosse gerenciado os pacotes do Node.js e exibilos no Front-end. 

No diretório do projeto, execute o comando `npm start`, para que seja executado o código no modo de desenvolvimento.
- Acesse [http://localhost:3000](http://localhost:3000) para visualizá-lo em seu navegador.

Executa o aplicativo no modo de desenvolvimento.
Abra http://localhost:3000 para visualização em seu navegador.

A página é recarregada a cada alteração, graças a implementação do `Nodemon`, um utilitário que monitora as mudanças nos arquivos do projeto, reiniciando o servidor. 


## Index.js

- Arquivo principal responsável por renderizar o elemento principal da aplicação.

```javascript
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import App from './App';
  
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
```
- Ao ser inicializado e acessado no navegador, a visualização ficará correspondente a imagem abaixo:

![localhost](https://github.com/FMTSL/Desafio-Tecnico-Energizou-Frontend/assets/88333095/54cd7b57-f2e0-41be-add9-ee087be09a28)

## Estilo Global

- O estilos globais foram definidos dentro do arquivo `global.js` dentro da pasta `styles`.

```javascript
import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    font-family: 'poppins', sans-serif;
  }
  
  body {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-color: #f2f2f2;
  }
`;

export default Global;
```

## Componentes

- Dentro da pasta `components` foi definido configurações gerais de formulário e tabela.

### Form.js

- O arquivo `Form.js` foi utilizado para tratar os dados recebidos e envia-los para o back-end.

```javascript
  import axios from "axios";
  import React, { useEffect, useRef } from "react";
  import styled from "styled-components";
  import {toast} from "react-toastify";
  import InputMask from 'react-input-mask';//Aplicação de Máscaras para CNPJ, CEP e Telefone
  
  const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
  `;
  
  const InputArea = styled.div`
    display: flex;
    flex-direction: column;
  `;
  
  const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
  `;
  
  const Label = styled.label``;
  
  const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
  `;
  
  const Form = ({ getUsers, onEdit, setOnEdit}) =>{
      
      const ref = useRef();
  
      useEffect(() =>{
          if(onEdit) {
              const user = ref.current;
  
              user.nomeCliente.value = onEdit.nomeCliente;
              user.senha.value = onEdit.senha;
              user.nomeEmpresa.value = onEdit.nomeEmpresa;
              user.cnpj.value = onEdit.cnpj;
              user.cep.value = onEdit.cep;
              user.endereco.value  = onEdit.endereco;
              user.numeroEndereco.value  = onEdit.numeroEndereco;
              user.telefone.value  = onEdit.telefone;
              user.email.value  = onEdit.email;
          
          }
      }, [onEdit]);
  
      const handleSubmit = async (e) =>{
          e.preventDefault();
  
          const user = ref.current;
  
          if(
              !user.nomeCliente.value ||
              !user.senha.value ||
              !user.nomeEmpresa.value ||
              !user.cnpj.value ||
              !user.cep.value ||
              !user.endereco.value ||
              !user.numeroEndereco.value ||
              !user.telefone.value ||
              !user.email.value
          ){
              return toast.warn("Preencha todos os campos do Formulário!");
          }
          //Se for Editar
          if (onEdit){
              await axios
              .put("http://localhost:3000/" + onEdit.idEmpresas, {
                  nomeCliente: user.nomeCliente.value,
                  senha: user.senha.value,
                  nomeEmpresa: user.nomeEmpresa.value,
                  cnpj: user.cnpj.value,
                  cep: user.cep.value,
                  endereco: user.endereco.value,
                  numeroEndereco: user.numeroEndereco.value,
                  telefone: user.telefone.value,
                  email: user.email.value
              })
              .then(({data}) => toast.success(data))
              .catch(({data}) => toast.error(data));
          }
          //Se não for para Editar
          else{
              await axios
              .post("http://localhost:3000", {
                  nomeCliente: user.nomeCliente.value,
                  senha: user.senha.value,
                  nomeEmpresa: user.nomeEmpresa.value,
                  cnpj: user.cnpj.value,
                  cep: user.cep.value,
                  endereco: user.endereco.value,
                  numeroEndereco: user.numeroEndereco.value,
                  telefone: user.telefone.value,
                  email: user.email.value
              })
              .then(({data}) => toast.success(data))
              .catch(({data}) => toast.error(data));
          }
  
          //Limpar Formulário após Incluir ou Editar
          user.nomeCliente.value = "";
          user.senha.value = "";
          user.nomeEmpresa.value = "";
          user.cnpj.value = "";
          user.cep.value = "";
          user.endereco.value = "";
          user.numeroEndereco.value = "";
          user.telefone.value = "";
          user.email.value = "";
  
          //Depois da inclusão sem ter conflito
          setOnEdit(null);
          //Atualizar o Grid
          getUsers();
      };
  
      return (
          <FormContainer ref={ref} onSubmit={handleSubmit}>
              <InputArea>
                  <Label>Nome do Cliente</Label>
                  <Input name='nomeCliente' type="text" placeholder="Digite seu Nome" required></Input>
              </InputArea>
              <InputArea>
                  <Label>Senha</Label>
                  <Input name='senha' type='password' placeholder="Digite sua Senha" required></Input>
              </InputArea>
              <InputArea>
                  <Label>Nome da Empresa</Label>
                  <Input name='nomeEmpresa' type="text" placeholder="Digite sua Empresa" required></Input>
              </InputArea>
              <InputArea>
                  <Label>CNPJ</Label>
                  <Input name='cnpj' as={InputMask} mask="99.999.999/9999-99" placeholder="00.000.000/0000-00" required></Input>
              </InputArea>
              <InputArea>
                  <Label>CEP</Label>
                  <Input name='cep' as={InputMask} mask="99999-999" placeholder="00000-000" required></Input>
              </InputArea>
              <InputArea>
                  <Label>Endereço</Label>
                  <Input name='endereco' type='text' placeholder="Digite seu Endereço" required></Input>
              </InputArea>
              <InputArea>
                  <Label>Numero de Endereço</Label>
                  <Input name='numeroEndereco' type='number' min={1} placeholder="Digite o n° de Endereço" required></Input>
              </InputArea>
              <InputArea>
                  <Label>Telefone</Label>
                  <Input name='telefone' as={InputMask} mask="(99)99999-9999" placeholder="(00) 00000-0000" required></Input>
              </InputArea>
              <InputArea>
                  <Label>E-Mail:</Label>
                  <Input name='email' type='email' placeholder="Digite seu e-mail" required></Input>
              </InputArea>
  
              <Button type="submit">Salvar</Button>
              <Button type="reset">Limpar</Button>
          </FormContainer>
      );
  };
  
  export default Form;
```
### Aplicação de Máscaras

- Para que o envio dos campos `CNPJ`, `CEP` e `Telefone` fossem enviados atendendo o padrão de cada um, foi utilizado Máscaras importadas do `react-input-mask`, fazendo com que fosse aplicado automaticamente a formatação, ao ser inserido pelo usuário.

*Para aplicar a máscara na tag `Input` do formulário, tratei a `InputMask` como um atributo dentro da tag*, conforme exemplo abaixo:

```javascript
  <Input name='telefone' as={InputMask} mask="(99)99999-9999"></Input>
  <Input name='cnpj' as={InputMask} mask="99.999.999/9999-99"></Input>
  <Input name='cep' as={InputMask} mask="99999-999"></Input>
```

![telefone-campo](https://github.com/FMTSL/Desafio-Tecnico-Energizou-Frontend/assets/88333095/251cedbd-2a19-47a2-a349-697e6b300198) ![campos-cep-cnpj](https://github.com/FMTSL/Desafio-Tecnico-Energizou-Frontend/assets/88333095/b9a41191-3914-4761-99a3-85fb1d6bec43)


### Validações

- Para impedir que os campos sejam enviados vazios, utilizei validações na própria tag `HTML` utilizando o `required` e especificando o `type`, que além de impedir o envio de forma indesejada por parte do usuário, garante uma semântica adequada.

![validacao](https://github.com/FMTSL/Desafio-Tecnico-Energizou-Frontend/assets/88333095/d789cdc4-11c4-461f-a8da-d67ad83416af) ![validacao](https://github.com/FMTSL/Desafio-Tecnico-Energizou-Frontend/assets/88333095/219331e0-eec8-47e8-a112-456a7c96e5da) ![validacao-email](https://github.com/FMTSL/Desafio-Tecnico-Energizou-Frontend/assets/88333095/2f964229-c310-462b-b90f-ae41be926680)

### CRUD no Front-End

- No front-end, é possivel realizar todas as funções que possibilitam um CRUD, sendo expresso o formulário de cadastro, listagem dos dados da `Empresa`, `CNPJ`, `Email` e `nomeCliente`. Abaixo segue exemplo de inclusão de dados feito na prática:

![localhost-front](https://github.com/FMTSL/Desafio-Tecnico-Energizou-Frontend/assets/88333095/b2dbf817-a977-40c3-aa63-c5d1433c345b)
*Dentro da lista, é possível realizar a edição e a exclusão dos dados. As determinadas funções estão aplicadas dentro dos ícones, que por questão de acessibilidade/usabilidade, aparece representados na figura de `lixeira` para exclusão e `caderno-caneta` para edição. Para realizar o `PUT` e o `DELETE`, basta clicar nos ícones anteriormente mencionados*. 

### Grid.js

- Agrupa funções e configurações para a lista de dados, atribuindo as funções de botões e demais outras.

```javascript
  import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({users, setUsers, setOnEdit}) =>{
  
  //Botão Editar
  const buttonEdit = (item) => {
    setOnEdit(item);
  };

  //Botão Delete
  const buttonDelete = async (idEmpresas) => {
    await axios
    .delete("http://localhost:3000/" + idEmpresas)
    .then(({data}) => {
      const newArray = users.filter((user) => user.idEmpresas !== idEmpresas);
      

      setUsers(newArray);
      toast.success(data);
    })
    .catch(({data}) => toast.error(data));

    setOnEdit(null);
  }
    return(
        <Table>
            <Thead>
                <Tr>
                    <Th>Empresa</Th>
                    <Th>CNPJ</Th>
                    <Th>Email</Th>
                    <Th onlyWeb>Cliente</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.map((item, i) => (
                    <Tr key={i}>
                        <Td width="20%">{item.nomeEmpresa}</Td>
                        <Td width="20%" onlyWeb>{item.cnpj}</Td>
                        <Td width="30%">{item.email}</Td>
                        <Td width="15%" onlyWeb>{item.nomeCliente}</Td>
                        <Td alignCenter width="5%">
                            <FaEdit onClick={() => buttonEdit(item)}/>
                        </Td>
                        <Td alignCenter width="5%">
                            <FaTrash onClick={() => buttonDelete(item.idEmpresas)}/>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;
```

## App.js

-  Arquivo concentra configurações da página principal, como container, além de receber as funções para que o aplicativo `React.js` funcione corretamente. 

```javascript
import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form";
import Grid from "./components/Grid"
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width:100%;
  max-width:800px;
  margin-top:20px;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:10px; 
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
    <Container>
      <Title>Cadastro</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
      <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit}/>
    </Container>
    <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT}/>
    <GlobalStyle/>
    </>
  );
}

export default App;
```
