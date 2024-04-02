
export const hideHeader = (menuOpen) => {


  function getCoords(block) {
    let box = block?.getBoundingClientRect();
    return {
      bottom: box.bottom + window.pageYOffset
    };
  }

  const bloctTitle = document.getElementById("block-title");
  let bottomOfBlockTitle;
  if(bloctTitle) {
    bottomOfBlockTitle = getCoords(bloctTitle).bottom;
  }else {
    bottomOfBlockTitle = 0;
  }


  const headerBlock = document.getElementById("header");
  let prevScrollpos = window.pageYOffset;

  window.addEventListener("scroll", () => {
    let currentScrollPos = window.pageYOffset;

    if( prevScrollpos > currentScrollPos){
      headerBlock.style.top = `0px`;
      headerBlock.style.position = "fixed"
    }
    if (prevScrollpos < currentScrollPos || currentScrollPos <= bottomOfBlockTitle ) {
      headerBlock.style.position ="absolute"
    }
    if(currentScrollPos === 0) {
      headerBlock.style.top = `0px`;
    }
    if(menuOpen) {
      headerBlock.style.position = "fixed"
    }

    prevScrollpos = currentScrollPos;
  })
}