$('#botao-placar').click(mostraPlacar)
$('#botao-sync').click(sincronizaPlacar)
function inserePlacar() {
  var corpoTabela = $('.placar').find('tbody')
  var usuario = 'Márcio'
  var contadorDePalavras = $('#contador-palavras').text()
  var linha = novaLinha(usuario, contadorDePalavras)
  linha.find('.botao-remover').click(removerLinha)
  corpoTabela.prepend(linha)
  $('.placar').slideDown(500)
  scrollPlacar()
}

// TODO: Scroll not function
function scrollPlacar() {
  var posicaoPlacar = $('.placar').offset().top
  // console.log(posicaoPlacar)
  $('body').animate({ scrollTop: posicaoPlacar + 'px' }, 1000)
}

function novaLinha(usuario, contadorDePalavras) {
  var linha = $('<tr>')
  var colunaUsuario = $('<td>').text(usuario)
  var colunaPalavra = $('<td>').text(contadorDePalavras)
  var colunaBtnRemover = $('<td>')
  var link = $('<a>')
    .addClass('botao-remover')
    .attr('href', '#')
  var icone = $('<i>')
    .addClass('small')
    .addClass('material-icons')
    .addClass('red-text')
    .addClass('lighten-1-text')
    .text('delete')

  link.append(icone)
  colunaBtnRemover.append(link)
  linha.append(colunaUsuario)
  linha.append(colunaPalavra)
  linha.append(colunaBtnRemover)
  console.log(linha)

  return linha
}

function removerLinha() {
  event.preventDefault()
  var linha = $(this)
    .parent()
    .parent()
  linha.fadeToggle(1000)
  setTimeout(() => {
    linha.remove()
  }, 1000)
}

function mostraPlacar() {
  $('.placar')
    .stop()
    .slideToggle(600)
}

function sincronizaPlacar() {
  console.log('Oi')
  //TODO: Post request salvar in servidor

  var placar = []
  var linhas = $('tbody > tr')
  // Interação para popular a tabela
  linhas.each(function() {
    var usuario = $(this)
      .find('td:nth-child(1)')
      .text()
    var nPalavra = $(this)
      .find('td:nth-child(2)')
      .text()

    var score = {
      usuario: usuario,
      pontos: nPalavra,
    }
    placar.push(score)
  })
  console.log(placar)
  var dados = {
    placar: placar,
  }
  $.post('http://localhost:3000/placar', dados, () => {
    console.log('Salvo no servidor')
  })
}

function atualizaPlacar() {
  $.get('http://localhost:3000/placar', function(data) {
    console.log('Busquei do servidor')
    console.log(data)
    $(data).each(function() {
      var linha = novaLinha(this.usuario, this.pontos)
      console.log(linha)
      linha.find('.botao-remover').click(removerLinha)
      $('tbody').append(linha)
    })
  })
}
