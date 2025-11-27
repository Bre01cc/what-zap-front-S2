const usuarios = async () => {
    const url = 'https://api-zap-8u4t.onrender.com/v1/whatszap'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data.dados_user)
    return data.dados_user
}

const criarUsers = (user) => {

    const containerUsers = document.getElementById("container-users")
    const usuario = document.createElement('div')
    usuario.classList.add('usuario')
    const img = document.createElement('img')
    img.src = './img/' + user['profile-image']

    const name = document.createElement('div')
    name.classList.add('info-user')
    const p = document.createElement('p')
    p.textContent = user.account
    name.appendChild(p)

    usuario.append(img,name)
    usuario.addEventListener('click',()=>{
        window.location.href = './home/usuario.html'
        sessionStorage.setItem('NumberUsuario',JSON.stringify(user))
    })
    containerUsers.append(usuario)

}

const carregarUser = async ()=>{
    const users = await usuarios()
    users.forEach(criarUsers)

}
carregarUser()

usuarios()