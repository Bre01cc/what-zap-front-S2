'use strict'
const usuariosPrincipais = () => {
    window.location.href = "../login.html"
}

const usuario = () => JSON.parse(sessionStorage.getItem('NumberUsuario'))

document.getElementById('usuario').addEventListener('click', () => usuariosPrincipais())

const perfis = document.getElementById('perfis')
const criarContatos = (contato) => {

    const card = document.createElement('div')
    card.classList.add('card')

    const imgPerfil = document.createElement('div')
    imgPerfil.classList.add('img-perfil')

    const img = document.createElement('img')
    img.src = '../img/contatos/' + contato.image

    imgPerfil.append(img)

    const infoContato = document.createElement('div')
    infoContato.classList.add('info-contato')

    const namePerfil = document.createElement('div')
    namePerfil.classList.add('name-perfil')

    const span = document.createElement('span')
    span.textContent = contato.name

    const p = document.createElement('p')
    p.textContent = contato.messages[contato.messages.length - 1].time

    namePerfil.append(span, p)

    // namePerfil.addEventListener('click',)

    const status = document.createElement('div')
    status.classList.add('status')

    const pStatus = document.createElement('p')
    pStatus.textContent = contato.messages[contato.messages.length - 1].content

    status.append(pStatus)

    infoContato.append(namePerfil, status)

    card.append(imgPerfil, infoContato)

    card.addEventListener('click', () => carregarContato(contato))
    perfis.append(card)

}

const caixaContato = document.getElementById('caixa-contato')

const containerContato = document.getElementById('contato')

const mensagem = document.getElementById('mensagem')

const messagens = document.getElementById('messagens')

const boxText = document.getElementById('box-text')

const boxMensagem = document.getElementById('box-mensagem')

const mensagemBusca = document.getElementById('pesquisaMensagem')

const infoContatoProfile = document.getElementById('info-profile-contato')

infoContatoProfile.classList.add('disable')

boxMensagem.classList.add('disable')

mensagem.classList.add('activate')

boxText.classList.add('disable')

const carregarContato = (contato) => {

    infoContatoProfile.classList.add('disable')
    mensagem.classList.remove('activate')
    mensagem.classList.add('disable')
    containerContato.classList.add('activate')
    messagens.classList.add('activate')
    boxText.classList.remove('disable')
    boxText.classList.add('activate')
    boxMensagem.classList.add('disable')
    containerContato.innerHTML = ''

    const cardContato = document.createElement('div')
    cardContato.classList.add('card-contato')
    const infoContato = document.createElement('div')

    infoContato.classList.add('info-contato-p')

    const namePerfil = document.createElement('div')

    namePerfil.classList.add('name-perfil')

    namePerfil.addEventListener('click', () => {
        ativarBusca()
        mensagemBusca.addEventListener('keydown', (event) => {
            buscarMensagem(event, contato)
        })
    })
    const span = document.createElement('span')
    span.textContent = contato.name

    namePerfil.append(span)

    const iconsContato = document.createElement('div')
    iconsContato.classList.add('icons-contato')

    const i1 = document.createElement('i')
    i1.classList.add('fas', 'fa-video', 'icon-pc')

    const i2 = document.createElement('i')
    i2.classList.add('fas', 'fa-phone', 'icon-pc')

    const i3 = document.createElement('i')
    i3.classList.add('fa-solid', 'fa-ellipsis-v', 'icon-pc')

    iconsContato.append(i1, i2, i3)

    infoContato.append(namePerfil, iconsContato)

    const imgPerfil = document.createElement('div')
    imgPerfil.classList.add('img-perfil')

    const img = document.createElement('img')

    img.src = '../img/contatos/' + contato.image

    img.addEventListener('click', () => {
        infoContatoProfile.classList.remove('disable')
        infoContatoProfile.classList.add('activate')

        boxMensagem.classList.remove('activate')
        boxMensagem.classList.add('disable')

        const imgContato = document.getElementById('img-contato')
        imgContato.innerHTML = ''
        const contatoImg = document.createElement('img')
        contatoImg.src =  '../img/contatos/' + contato.image
        imgContato.append(contatoImg)
       
        const nome = document.getElementById('nome-info')
        nome.innerHTML = ''
        const descricao = document.getElementById('descricao-info')
        descricao.innerHTML = ''
        const telefone = document.getElementById('telefone-info')
        telefone.innerHTML = ''

        const pNome = document.createElement('p')
        pNome.textContent = contato.name

        const pTelefone = document.createElement('p')
        pTelefone.textContent = contato.number

        const pDescricao = document.createElement('p')
        pDescricao.textContent = contato.description

        nome.append(pNome)
        telefone.append(pTelefone)
        descricao.append(pDescricao)
    })
    imgPerfil.append(img)

    cardContato.append(img, infoContato)
    containerContato.append(cardContato)
    console.log(contato)
    caixaContato.innerHTML = ''
    contato.messages.forEach(mensagem => {
        carregarMensagens(mensagem, false)
    })
}

document.getElementById('fecharContato').addEventListener('click', ()=>{
    infoContatoProfile.classList.remove('activate')
    infoContatoProfile.classList.add('disable')
})

let click = true
const ativarBusca = () => {
    if (click) {
        boxMensagem.classList.remove('disable')
        boxMensagem.classList.add('activate')
        click = false
    } else {
        boxMensagem.classList.remove('activate')
        boxMensagem.classList.add('disable')
        click = true
    }

}


const buscarMensagemContato = (contato, palavraChave) => {
    // console.log(contato)

    caixaContato.innerHTML = ''
    contato.messages.forEach(mensagem => {
        if (mensagem.content.includes(palavraChave)) {
            carregarMensagens(mensagem, true)
        } else {
            carregarMensagens(mensagem, false)
        }
    });

}
const buscarMensagem = (event, contato) => {
    if (event.key == 'Enter') {
        let mensagemL = mensagemBusca.value
        if (mensagemL != '' && mensagemL != null && mensagemL != undefined) {
            buscarMensagemContato(contato, mensagemL)
        } else {
            alert('Digite algo valido')
        }

    }

}

const carregarMensagens = (mensagens, classe) => {

    if (mensagens.sender == 'me') {
        const containerUser = document.createElement('div')
        containerUser.classList.add('container-user')

        if (classe) {
            console.log(classe)
            containerUser.classList.add('mensagem-filtro')

        }

        const mensagemUsuario = document.createElement('div')
        mensagemUsuario.classList.add('mensagem-usuario')

        const pM = document.createElement('p')
        pM.textContent = mensagens.content

        const pT = document.createElement('p')
        pT.classList.add('horario')
        pT.textContent = mensagens.time

        mensagemUsuario.append(pM, pT)

        containerUser.append(mensagemUsuario)

        caixaContato.append(containerUser)

    }
    if (mensagens.sender != 'me') {
        const containerContato = document.createElement('div')
        containerContato.classList.add('container-contato')

        if (classe) {
            containerContato.classList.add('mensagem-filtro')
        }
        const mensagemContato = document.createElement('div')
        mensagemContato.classList.add('mensagem-contato')

        const pM = document.createElement('p')
        pM.textContent = mensagens.content

        const pT = document.createElement('p')
        pT.classList.add('horario')
        pT.textContent = mensagens.time

        mensagemContato.append(pM, pT)

        containerContato.append(mensagemContato)
        caixaContato.append(containerContato)

    }

}
const carregarContatos = async () => {

    const usuarioContatos = await usuario()

    usuarioContatos.contacts.forEach(criarContatos)
}

const pesquisa = document.getElementById('pesquisa')
const mapear = (event) => {
    if (event.key == 'Enter') {

        const contatos = []
        if (pesquisa.value != '') {
            usuario().contacts.forEach(contato => {

                if (contato.name.toLowerCase().includes(pesquisa.value)) {
                    contatos.push(contato)
                }
            })


            if (contatos.length > 0) {
                perfis.innerHTML = ''
                contatos.forEach(criarContatos)
            }
            else {
                alert('Não foi possível encontrar o contato')
            }
        } else {
            alert('Não foi possível encontrar o contato')
        }


    }
}

pesquisa.addEventListener('keydown', mapear)

carregarContatos()
