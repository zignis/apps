import '@dailydotdev/shared/src/styles/globals.css';

// Inject app div
const appContainer = document.createElement('daily-companion-app');
document.body.appendChild(appContainer);

// Create shadow dom
const shadow = document
  .querySelector('daily-companion-app')
  .attachShadow({ mode: 'open' });

const style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
:host {
  all: initial;
  font-size: initial;
}
@import "chrome-extension://dhhaojmcngfjmoinjljlkdknbcildjlg/css/companion.css";
`;
shadow.appendChild(style);

const wrapper = document.createElement('div');
wrapper.id = 'daily-companion-wrapper';
shadow.appendChild(wrapper);