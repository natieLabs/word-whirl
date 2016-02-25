  const POSTERS_PER_ROW = 12;
  const RING_RADIUS = 200;

  var spaceCount = 0;

  function setup_posters(row) {
      var posterAngle = 360 / POSTERS_PER_ROW;
      for (var i = 0; i < POSTERS_PER_ROW; i++) {
          var poster = document.createElement('div');
          poster.className = 'poster';
          // compute and assign the transform for this poster
          var transform = 'rotateY(' + (posterAngle * i) + 'deg) translateZ(' + RING_RADIUS + 'px)';
          poster.style.webkitTransform = transform;
          // setup the number to show inside the poster
          var content = poster.appendChild(document.createElement('p'));
          content.textContent = i;
          // add the poster to the row
          //row.appendChild(poster);
      }

  }

  function init() {
      setup_posters(document.getElementById('ring-1'));
      setup_posters(document.getElementById('ring-2'));
      setup_posters(document.getElementById('ring-3'));
      getWords();
  }

  // call init once the document is fully loaded
  window.addEventListener('load', init, false);


  function getWords() {
      $.get(
          window.location.origin + '/getWords',
          function(data) {
              // console.log(data);

              var adj1List = data.adj1.split(",");
              var adj2List = data.adj2.split(",");
              var nounList = data.nouns.split(",");

              var wordLists = [adj1List, adj2List, nounList];
              var rings = [$("#ring-1"), $("#ring-2"), $("#ring-3")];
              for (var j = 0; j < rings.length; j++) {
                  var html = "";
                  for (var i = 0; i < wordLists[j].length; i++) {
                      html += '<div class="poster" style="-webkit-transform: rotateX(' + i * 30 + 'deg) translateZ(200px); "><p>';
                      html += wordLists[j][i];
                      html += '</p></div>';
                  }
                  rings[j].html(html);
              }

          }
      );
  }


  $(function() {
      $("#wheels").html('<div class="stages" id="stage"> <div class="rotate" id="rotate"> <div id="ring-1" class="ring animated"> </div> </div> </div> <div class="stages" id="stage2"> <div class="rotate" id="rotate"> <div id="ring-2" class="ring animated"> </div> </div> </div> <div class="stages" id="stage3"> <div class="rotate" id="rotate"> <div id="ring-3" class="ring animated"> </div> </div> </div>')


      $(document).keydown(function(evt) {

          if (evt.keyCode == 32) {
              // increment space count to see how many wheels should be stopped
              // if (spaceCount == 3) {
              //     $("#hideme").show();
              // }
              if (spaceCount == 3) {
                $(".ring").addClass("animated");
                $(".poster").css("color", "rgba(0, 0, 0, 0.2)");
                  getWords();
                  spaceCount = 0;
                  return;
              }

              spaceCount += 1;
              // $("#ring-"+spaceCount).css("-webkit-animation-iteration-count", 0);
              $("#ring-" + spaceCount).removeClass("animated")
              var children = $("#ring-" + spaceCount).children();
              // $(children).css("color", "rgba(0, 0, 0, 0.2)");
              $(children).first().css("color", "rgb(90, 157, 255)");

          }
      });
  });
