$(document).ready(function () {
  $('#toggle').click(function () {
    $('#archive').toggle()
    $('#toggle').text(function(i, text) {
      return text === "Az összes cikkem"
        ? "Összecsuk"
        : "Az összes cikkem"
    })
  })
})
