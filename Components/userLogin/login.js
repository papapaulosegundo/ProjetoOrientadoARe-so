function validarLogin() {
    // Obtém os valores dos campos de usuário e senha do formulário HTML
    var usuario = document.getElementById("usuario").value;
    var senha = document.getElementById("senha").value;

    // Verifica se algum dos campos (usuário ou senha) está vazio
    if (usuario === "" || senha === "") {
        // Se algum campo estiver vazio, exibe um alerta informando o erro
        Swal.fire({
            icon: 'warning',
            title: 'Atenção!',
            text: 'Por favor, preencha todos os campos.',
        });
    } else {
        // Seleciona o formulário de login pelo id "loginForm"
        const formulario = document.getElementById("loginForm");

        // Cria um objeto FormData contendo os dados do formulário para enviar via POST
        const formData = new FormData(formulario);

        // Envia os dados para o arquivo "login.php" usando o método fetch (API Fetch)
        fetch("login.php", {
            method: "POST", // Define o método como POST
            body: formData, // Define o corpo da requisição com os dados do formulário
        })
        .then((response) => response.json()) // Converte a resposta para JSON
        .then((dados) => {
            // Verifica se o usuário foi autenticado a partir dos dados retornados
            if(dados.autenticado) {
                if(dados.tipo == 'admin') {
                    window.location.href = "/Sem-Esperar-em-Filas/Components/AdminRegistros/AdminUser.php"; // Redireciona para a página inicial
                } else {
                    window.location.href = "../../index.php"; // Redireciona para a página inicial
                }
            } else {
                // Se não autenticado, exibe um alerta com a mensagem de erro
                if( dados.usuario )
                    Swal.fire({
                        icon: "error",
                        title: 'Erro!',
                        text: 'Usuário ou senha inválidos.',
                    });
                else
                    Swal.fire({
                        icon: 'error',
                        title: "Usuário não cadastrado!",
                        text: "Não encontramos um usuário com esse e-mail ou nome de usuário. Verifique e tente novamente.",
                    });
            }
        })
        .catch((error) => {
            // Em caso de erro na requisição, exibe o erro no console e um alerta
            console.error("Erro:", error);
            Swal.fire({
                icon: "error",
                title: 'Erro!',
                text: 'Usuário ou senha inválidos.',
          });
        });     
    }
}

function cadastrar() {
    // Redireciona o usuário para a página de cadastro
    window.location.href = "../userRegister/cadastro.html";
}

function login() {
    // Redireciona o usuário para a página de login
    window.location.href = "login.html";
}
