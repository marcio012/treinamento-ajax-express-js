$('#botao-frase').click(fraseAleatoria)
$('#botao-frase-id').click(buscarFraseIdServidor)

function buscarFraseIdServidor() {
  $('#spinner').show()
  var fraseId = $('#input-id-frase').val()
  console.log(fraseId)
  var dados = {
    id: fraseId
  }
  $.get('http://192.168.25.90:3000/frases', dados, trocaFrasePorIdServidor)
    .fail(() => {
      $('#error-server').show()
      setTimeout(() => {
        $('#error-server').toggle()
      }, 2000)
    })
    .always(() => {
      $('#spinner').hide()
    })
}

function trocaFrasePorIdServidor(data) {
  var frase = $('.frase')
  frase.text(data.texto)
  atualizaTamanhoFrase()
  atualizaTempoInicial(data.tempo)
  console.log(data)
  console.log('trocou')
}

function fraseAleatoria() {
  $('.frase').toggle()
  $('#spinner').show()

  $.get('http://192.168.25.90:3000/frases', trocaFraseAleatoriaServidor)
    .fail(function () {
      $('#error-server').show()
      setTimeout(function () {
        $('#error-server').toggle()
      }, 2000)
    })
    .always(function () {
      $('#spinner').hide()
    })
}

function trocaFraseAleatoriaServidor(data) {
  var frase = $('.frase')
  frase.toggle()
  var numAleatorio = Math.floor(Math.random() * data.length)
  frase.text(data[numAleatorio].texto)
  atualizaTamanhoFrase()
  atualizaTempoInicial(data[numAleatorio].tempo)
}