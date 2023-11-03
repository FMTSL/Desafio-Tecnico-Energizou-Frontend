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
                email: user.email.value,
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
                email: user.email.value,
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