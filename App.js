/*es6 Programming*/
class TypeWriter{
  constructor(txtElement,words,wait = 500){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type(){
    //current index of words
    const current = this.wordIndex % this.words.length;
    //geting full text of words
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      //remove txt 1 by 1
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } 
     //add txt 1 by 1
    else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    //intserting txt into element injecting 
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //here we declare typing of your words
    let typeSpeed = 100;

    if(this.isDeleting){
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      // Make a puse at the end
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if(this.isDeleting && this.txt === ''){
      // statement
      this.isDeleting = false;
      // Move to the next word
      this.wordIndex++;
      //Pause b efore typing
      typeSpeed = 300;
    }
    setTimeout(() => this.type() , typeSpeed);
  }
}

document.addEventListener('DOMContentLoaded' , init);

function init (argument) {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');

  new TypeWriter(txtElement , words, wait);
}
