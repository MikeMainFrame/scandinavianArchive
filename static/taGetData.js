(function main() {

  tMinus.textContent = new Date().toUTCString();

  taIndex.addEventListener('click', () => { getLibraryList() })
  
  //getPage('/zelnick'); // lab mode ....

  function getPage(what) {

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => { if (xhr.readyState === 4) ui(xhr.responseText) };
    xhr.open("GET", "/library" + what);
    xhr.send();

    function ui(O) {
      zarticle.innerHTML = O;
    }
  }

  function getLibraryList() {

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => { if (xhr.readyState === 4) libraryListUI(xhr.responseText) };
    xhr.open("GET", "/library");
    xhr.send();

    function libraryListUI(O) {

      var I = JSON.parse(O), x = 0, y = 0;

      svgns = 'http://www.w3.org/2000/svg'

      var svg = document.createElementNS(svgns, 'svg');
      svg.setAttribute("id", 'zlibrary');
      svg.setAttribute("fill", '#800');
      svg.setAttribute("viewbox", "0 0 400 20000");

      I.forEach(slot => {
        var rect = document.createElementNS(svgns, 'rect');
        rect.id = slot.name;
        rect.setAttribute("x", 0);
        rect.setAttribute("y", y)
        rect.setAttribute("width", 300);
        rect.setAttribute("height", 48);
        rect.setAttribute("rx", 5);
        rect.addEventListener('click', () => {
          alert(event.target.id)
        })
        svg.appendChild(rect);

        var text = document.createElementNS(svgns, 'text');
        text.setAttribute("x", x + 20);
        text.setAttribute("y", y + 30);
        text.setAttribute("fill", '#fff');
        text.textContent = slot.name;
        svg.appendChild(text);
        y = y + 60;
      });

      zmain.appendChild(svg);
      
    }
  }
})();