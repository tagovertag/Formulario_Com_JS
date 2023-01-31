

class Cadastro {

    constructor(){
        this.id = 1;
        this.arrayCadastro = [];
        this.editId = null

    }

    salvar(){
        let dados = this.lerDados();
        if(this.validaCampos(dados) == true){
            if(this.editId == null){
                this.adicionar(dados);
            }else{
                this.atualizar(this.editId, dados);
            }
        }

        this.listaTabela();
        this.cancelar();
    }

    listaTabela(){
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';
        
        for(let i = 0; i < this.arrayCadastro.length; i++) {
            let tr = tbody.insertRow();
            
            let td_id = tr.insertCell();
            let td_nome = tr.insertCell();
            let td_telefone = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayCadastro[i].id;
            td_nome.innerText = this.arrayCadastro[i].nomeCadastro;
            td_telefone.innerText = this.arrayCadastro[i].telefoneCadastro;

            td_id.classList.add('center')

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/editor.png';
            imgEdit.setAttribute("onclick", "cadastro.prepararEditar("+ JSON.stringify(this.arrayCadastro[i]) +")");

            let imgDelet = document.createElement('img');
            imgDelet.src = 'img/delete.png'
            imgDelet.setAttribute("onclick", "cadastro.deletar("+ this.arrayCadastro[i].id +")");

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelet);
            
        }
    }

    adicionar(dados){
        this.arrayCadastro.push(dados);
        this.id++;

    }


    prepararEditar(valores){
        this.editId = valores.id;

        document.getElementById('nome').value = valores.nomeCadastro;
        document.getElementById('telefone').value = valores.telefoneCadastro;

        document.getElementById('bt1').innerText = 'Atualizar';

    }

    atualizar(id, dados){
        for(let i = 0; i < this.arrayCadastro.length; i++){
            if(this.arrayCadastro[i].id == id){
                this.arrayCadastro[i].nomeCadastro = dados.nomeCadastro;
                this.arrayCadastro[i].telefoneCadastro = dados.telefoneCadastro;
            }
        }
    }

    lerDados() {
        let dados = {}

        dados.id = this.id;
        dados.nomeCadastro = document.getElementById('nome').value
        dados.telefoneCadastro = document.getElementById('telefone').value
        return dados;
    }

    validaCampos(dados) {

        let msg = '';
        if(dados.nomeCadastro == '') {
            msg += '- Informe seu nome \n';        
        }
        if(dados.telefoneCadastro == '') {
            msg += '- Informe seu numero \n';        
        }
        if(msg != '')  {
            alert(msg);
            return false
        }
        return true;
    }

    cancelar() {
        document.getElementById('nome').value = '';
        document.getElementById('telefone').value = '';

        document.getElementById('bt1').innerText = 'salvar';
        this.editId = null;
    }

    deletar(id){
        if(confirm('Deseja deletar o cadastro ? ' + id)){
            let tbody = document.getElementById('tbody');

            for(let i = 0; i < this.arrayCadastro.length; i++) {
                if(this.arrayCadastro[i].id == id){
                    this.arrayCadastro.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }    
    }
}


var cadastro = new Cadastro();