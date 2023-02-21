import insane from 'insane';

class CECdown {
  extras;
  constructor(extras) {
    this.extras = extras;
  }

  toHTML(text) {
    let html = [];
    text = text.replace(/(?:\r\n|\r|\n)/g, "");
    text = text.replace(/\t/g, "");
    text = text.replace(/\s{2,}/g, ' ');
    text = text.replace(/:!:h1(.*)h1:!:/gm, '<h1>$1</h1>');
    text = text.replace(/:!:h2(.*)h2:!:/gm, '<h2>$1</h2>');
    text = text.replace(/:!:h3(.*)h3:!:/gm, '<h3>$1</h3>');
    text = text.replace(/:!:h4(.*)h4:!:/gm, '<h4>$1</h4>');
    text = text.replace(/:!:h5(.*)h5:!:/gm, '<h5>$1</h5>');
    text = text.replace(/:!:h6(.*)h6:!:/gm, '<h6>$1</h6>');
    text = text.replace(/:!:b(.*)b:!:/gm, '<strong>$1</strong>');
    text = text.replace(/:!:i(.*)i:!:/gm, '<em>$1</em>');

    this.extras.forEach((element) => {
      const className = element.className;
      const key = element.key;
      const regex = new RegExp(`:!:${key}(.*)${key}:!:`);
      text = text.replace(regex, `<span class="${className}">$1</span>`);
    });
    return insane(text, {
      allowedTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'span'],
      allowedAttributes: { span: ['class'] },
    });
  }
}

let markdown = new CECdown([{ key: 'a', className: 'bonkus' }]);
console.log(markdown.toHTML(`
:!:h1
  :!:h2
    :!:a
      HELLO
    a:!:
  h2:!:
h1:!:`
));

export default CECdown;
