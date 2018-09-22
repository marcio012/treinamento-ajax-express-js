var tempoInicial = $('#tempo-digitacao').text()
var campo = $('#campo-digitacao')
var contadorDePalavras = $('#contador-palavras')
var contadorDecaracteres = $('#contador-caracteres')
var campo = $('.campo-digitacao')

$(function() {
  atualizaTamanhoFrase()
  inicializaContadores()
  inicializaCronometro()
  verificaDigitacao()
  atualizaPlacar()
  $('#botao-reiniciar').click(reiniciaJogo)
})

function atualizaTempoInicial(tempo) {
  tempoInicial = tempo
  $('#tempo-digitacao').text(tempo)
}

function atualizaTamanhoFrase() {
  var frase = $('.frase').text()
  var qtdPalavras = frase.split(/\S+/g).length - 1
  var tamanhoFrase = $('#tamanho-frase')
  tamanhoFrase.text(qtdPalavras)
}

function inicializaContadores() {
  campo.on('input', function() {
    var conteudo = campo.val()
    var qtdPalavrasDigitadas = conteudo.split(/\S+/g).length - 1
    contadorDePalavras.text(qtdPalavrasDigitadas)

    var qtdCaracteresDigitados = conteudo.length
    $('#contador-caracteres').text(qtdCaracteresDigitados)
  })
}

function inicializaCronometro() {
  campo.one('focus', function() {
    var tempoParaDigitar = $('#tempo-digitacao').text()
    $('#botao-reiniciar').attr('disabled', true)
    var cronometroId = setInterval(function() {
      tempoParaDigitar--
      $('#tempo-digitacao').text(tempoParaDigitar)
      if (tempoParaDigitar < 1) {
        clearInterval(cronometroId)
        finalizaJogo()
      }
    }, 1000)
  })
}

function finalizaJogo() {
  campo.attr('disabled', true)
  campo.addClass('gray')
  $('#botao-reiniciar').attr('disabled', false)
  inserePlacar()
}

function verificaDigitacao() {
  campo.on('input', function() {
    var frase = $('.frase')
      .text()
      .replace(/\r?\n|\r/g, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/^\s+/, '')
      .replace(/\s+$/, '')
    var digitado = campo.val()
    var comparavel = frase.substr(0, digitado.length)
    // versao Ecma Script 6
    // var comparavel = frase.startsWith(digitado)
    console.log('digitado: ' + digitado)
    console.log('frase c : ' + comparavel)
    if (digitado == comparavel) {
      campo.addClass('border-verde')
      campo.removeClass('border-vermelha')
    } else {
      campo.addClass('border-vermelha')
      campo.removeClass('border-verde')
    }
  })
}

function reiniciaJogo() {
  campo.attr('disabled', false)
  campo.val('')
  $('#contador-palavras').text('0')
  $('#contador-caracteres').text('0')
  $('#tempo-digitacao').text(tempoInicial)
  campo.removeClass('gray')
  campo.removeClass('border-verde')
  campo.removeClass('border-vermelha')
  inicializaCronometro()
}
