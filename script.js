const nome = document.getElementById("nome")
const cpf = document.getElementById("cpf")
const nasc = document.getElementById("nasc")
const salario = document.getElementById("salario")
const funcao = document.getElementById("funcao")

const cpf2 = document.getElementById("cpf2")
const salario2 = document.getElementById("salario2")  
const dados = document.getElementById("dados")
let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || []
const cpf3 = document.getElementById("cpf3")
const dados3 = document.getElementById("dados3")

let funcionarioEncontrado = null

function cadastrarf(){
    if(nome.value.trim() && cpf.value.trim() && nasc.value.trim() && salario.value.trim() && funcao.value.trim()){
        if(/^[A-Za-zÀ-ÿ\s]+$/.test(nome.value)){
            if(Number(salario.value) > 0){
                let achou = false
                for(let f of funcionarios){
                    if(f.CPF == cpf.value){
                        achou = true
                    }
                }
                if(!achou){
                    const novoFuncionario = {
                        Nome: nome.value,
                        CPF: cpf.value,
                        DataNascimento: nasc.value,
                        Salario: Number(salario.value),
                        Funcao: funcao.value,
                        EstadoAtual: "Ativo"
                    }
                    funcionarios.push(novoFuncionario)
                    localStorage.setItem("funcionarios", JSON.stringify(funcionarios))
                    alert(novoFuncionario.Nome + " cadastrado com sucesso")
                    list()
                }else{
                    alert("Já existe um funcionário cadastrado com esse CPF")
                }
            }else{
                alert("Digite um salário válido")
            }
        }else{
            alert("O nome deve conter apenas letras")
        }
    }else{
        alert("Preencha todos os campos")
    }
}

function list(){
    const lista = document.getElementById("lista-cliente")
    lista.innerHTML = ""
    for(let f of funcionarios){
        lista.innerHTML += `
            <p>Nome: ${f.Nome}</p>
            <p>CPF: ${f.CPF}</p>
            <p>Data de nascimento: ${f.DataNascimento}</p>
            <p>Salário: ${f.Salario}</p>
            <p>Função: ${f.Funcao}</p>
            <p>Estado atual: ${f.EstadoAtual}</p>
            <hr>
        `
    }
}

function buscarsalario(){
    if(cpf2.value.trim()){
        funcionarioEncontrado = null
        for(let f of funcionarios){

            if(f.CPF == cpf2.value){
                funcionarioEncontrado = f
            }
        }
        if(funcionarioEncontrado){
            alert("Cliente encontrado com sucesso!")
            dados.innerHTML = `
                <p>Nome: ${funcionarioEncontrado.Nome}</p>
                <p>Salário atual: R$ ${funcionarioEncontrado.Salario}</p>
            `
        }else{
            alert("Funcionário não encontrado")
            dados.innerHTML = ""
        }
    }else{
        alert("Digite o CPF")
    }
}

function editar(){
    if(funcionarioEncontrado){
        if(salario2.value.trim()){
            if(Number(salario2.value) > 0){
                if(Number(salario2.value) >= funcionarioEncontrado.Salario){
                    funcionarioEncontrado.Salario = Number(salario2.value)
                    localStorage.setItem("funcionarios", JSON.stringify(funcionarios))
                    alert("Salário alterado com sucesso")
                    dados.innerHTML = `
                        <p>Nome: ${funcionarioEncontrado.Nome}</p>
                        <p>Salário atual: R$ ${funcionarioEncontrado.Salario}</p>
                    `
                    salario2.value = ""
                    list()
                }else{
                    alert("O novo salário não pode ser menor que o atual")
                }
            }else{
                alert("Digite um salário válido")
            }
        }else{
            alert("Digite o novo salário")
        }
    }else{
        alert("Busque um funcionário primeiro")
    }
}

function buscardemissao(){
    if(cpf3.value.trim()){
        funcionarioEncontrado = null
        for(let f of funcionarios){

            if(f.CPF == cpf3.value){
                funcionarioEncontrado = f
            }
        }
        if(funcionarioEncontrado){
            if(funcionarioEncontrado.EstadoAtual == "Ativo"){
                alert("funcionário encontrado com sucesso!")
                dados3.innerHTML = `
                    <p>Nome: ${funcionarioEncontrado.Nome}</p>
                    <p>CPF: ${funcionarioEncontrado.CPF}</p>
                    <p>Função: ${funcionarioEncontrado.Funcao}</p>
                    <p>Estado Atual: ${funcionarioEncontrado.EstadoAtual}</p>
                `
            }else{
                alert("Esse funcionário já está demitido")
                dados3.innerHTML = ""
                funcionarioEncontrado = null
            }
        }else{
            alert("Funcionário não encontrado")
            dados3.innerHTML = ""
        }
    }else{
        alert("Digite o CPF")
    }
}

function demitir(){

    if(funcionarioEncontrado){

        funcionarioEncontrado.EstadoAtual = "Demitido"

        localStorage.setItem("funcionarios", JSON.stringify(funcionarios))

        alert("Funcionário demitido com sucesso!")

        dados3.innerHTML = `
            <p>Nome: ${funcionarioEncontrado.Nome}</p>
            <p>CPF: ${funcionarioEncontrado.CPF}</p>
            <p>Função: ${funcionarioEncontrado.Funcao}</p>
            <p>Estado Atual: ${funcionarioEncontrado.EstadoAtual}</p>
        `

        funcionarioEncontrado = null

    }else{
        alert("Busque um funcionário primeiro")
    }
}

function listarFuncionarios() {

    const ativos = document.getElementById("ativos")
    const demitidos = document.getElementById("demitidos")

    let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || []

    ativos.innerHTML = ""
    demitidos.innerHTML = ""

    for (let funcionario of funcionarios) {

        if (funcionario.EstadoAtual == "Ativo") {

            ativos.innerHTML += `
                <p>
                    Nome: ${funcionario.Nome}<br>
                    CPF: ${funcionario.CPF}<br>
                    Função: ${funcionario.Funcao}<br>
                    Salário: R$ ${funcionario.Salario}
                </p>
                <hr>
            `

        } else if (funcionario.EstadoAtual == "Demitido") {

            demitidos.innerHTML += `
                <p>
                    Nome: ${funcionario.Nome}<br>
                    CPF: ${funcionario.CPF}<br>
                    Função: ${funcionario.Funcao}<br>
                    Salário: R$ ${funcionario.Salario}
                </p>
                <hr>
            `
        }
    }
}

if(document.getElementById("lista-cliente")){
    list()
}

if(document.getElementById("ativos")){
    listarFuncionarios()
}