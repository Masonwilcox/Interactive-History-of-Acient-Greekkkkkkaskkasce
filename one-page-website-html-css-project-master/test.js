
    function printMousePos(event) {
        document.body.textContent = "clientX: " + event.screenX + " - clientY: " + event.screenY;
      }
      document.addEventListener("click", printMousePos);