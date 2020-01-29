(function main() {

  tMinus.textContent = new Date().toUTCString();

  taIndex.addEventListener('click', () => { getLibraryList() })

  function getPage(what) {

    const X = new XMLHttpRequest();

    X.onreadystatechange = () => { if (X.readyState === 4) ui(X.responseText) };
    X.open("GET", what);
    X.send();

    function ui(O) {
      zarticle.innerHTML = O;
    }
  }

  function getLibraryList() {

    const X = new XMLHttpRequest();

    X.onreadystatechange = () => { if (X.readyState === 4) libraryListUI(X.responseText) };
    X.open("GET", "/LISTARTICLES/");
    X.send();

    function libraryListUI(O) {

      var I = JSON.parse(O), x = 0, y = 0;

      svgns = 'http://www.w3.org/2000/svg'

      var svg = document.createElementNS(svgns, 'svg');
      svg.setAttribute("id", 'zlibrary');
      svg.setAttribute("fill", taSideBarColor.getAttribute('fill'));
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
          getPage(event.target.id);
          const die = document.getElementById('zlibrary');
          die.parentNode.removeChild(die);
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