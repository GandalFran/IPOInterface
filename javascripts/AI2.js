//CONFIGURACION SDK PARA AVATAR ANIMADO
      SDK.applicationId = "6974569384314651232";
      var sdk = new SDKConnection();
      var web = new WebAvatar();
      web.connection = sdk;
      web.avatar = "13974700";
      web.voice = "istc-lucia-hsmm";
      web.voiceMod = "default";
      web.lang = "es";
      web.width = "250";
      web.height = "300";
      web.prefix = null
      web.addMessage("", "like", "smile", "");
      web.processMessages();
	  
//CONFIGURACION DE API.AI
      var accessToken = "9d984e6464194a60b0840f9906dbc2b4";
      var baseUrl = "https://api.api.ai/v1/";
      var i = 1;
      $(document).ready(function() {
      $("#chat").keypress(function(event) {
      if (event.which == 13) {
      event.preventDefault();
      send();
      }
      });
      $("#rec").click(function(event) {
      switchRecognition();
      });
      });
      var recognition;
      function startRecognition() {
      recognition = new webkitSpeechRecognition();
      recognition.onstart = function(event) {
      updateRec();
      };
      recognition.onresult = function(event) {
      var text = "";
      for (var i = event.resultIndex; i < event.results.length; ++i) {
      text += event.results[i][0].transcript;
      }
      setInput(text);
      stopRecognition();
      };
      recognition.onend = function() {
      stopRecognition();
      };
      recognition.lang = "es";
      recognition.start();
      }
      function stopRecognition() {
      if (recognition) {
      recognition.stop();
      recognition = null;
      }
      updateRec();
      }
      function switchRecognition() {
      if (recognition) {
      stopRecognition();
      } else {
      startRecognition();
      }
      }
      function setInput(text) {
      //$("#chat").val(text);
      send(text);
      }
      function updateRec() {
      $("#rec").text(recognition ? "mic" : "mic_none");
      }
      function send(text) {
            if(i == 1){
                  i++;
                  if(undefined === text){
                        var text = $("#chat").val();
                  }
                  $.ajax({
                  type: "POST",
                  url: baseUrl + "query?v=20150910",
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  headers: {
                  "Authorization": "Bearer " + accessToken
                  },
                  data: JSON.stringify({ query: text, lang: "es", sessionId: "somerandomthing" }),
                  success: function(data) {
                  var uteracion = data.result.resolvedQuery;
                  var respuesta = data.result.fulfillment.speech;
                  var intencion = data.result.metadata.intentName;
                  var confidencia = data.result.score * 100;
                  console.log("Mensaje: " + uteracion);
                  console.log("Intención: " + intencion);
                  console.log("Respuesta: " + respuesta);

                  if(respuesta.includes("aENLACE")){
                        window.location.href = respuesta.split("ENLACE")[1] + ".html";
                  }else{
                        setResponse(respuesta, intencion, confidencia, uteracion);
                  }
                  },
                  error: function() {
                  setResponse("Internal Server Error");
                  }
                  });
            }
            else{
                  if(undefined === text){
                        var text = $("#chat").val();
                  }
                  $.ajax({
                  type: "POST",
                  url: baseUrl + "query?v=20150910",
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  headers: {
                  "Authorization": "Bearer " + accessToken
                  },
                  data: JSON.stringify({ query: text, lang: "es", sessionId: "somerandomthing" }),
                  success: function(data) {
                  var uteracion = data.result.resolvedQuery;
                  var respuesta = data.result.fulfillment.speech;
                  var intencion = data.result.metadata.intentName;
                  var confidencia = data.result.score * 100;
                  console.log("Mensaje: " + uteracion);
                  console.log("Intención: " + intencion);
                  console.log("Respuesta: " + respuesta);

                  window.location.href = "diagnostico2.html";

                  },
                  error: function() {
                  setResponse("Internal Server Error");
                  }
                  });
            }
      }
      function setResponse(val, intent, confidencia, uteracion) {
      $("#response").text("Bot: "+val);
      web.addMessage(val, "", "", "");
      web.processMessages();
      }