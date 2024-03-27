import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');



/**
 * decorates the header, mainly the navigation
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta).pathname : '/nav';
  const fragment = await loadFragment(navPath);
  // decorate nav DOM
  const nav = document.createElement('nav');
  nav.classList.add('eggs-navigation');
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const buttonwrapper = document.createElement('div');
  buttonwrapper.className = 'eggs-header-button-wrapper';

  const aTag = document.createElement('a');
  aTag.href = 'https://www.eggs.de/de.html#container-fullwidth-37f2736b45';
  aTag.title = 'Kontaktiere uns noch heute';

  const button = document.createElement('button');
  button.className = 'eggs-header-button';
  button.ariaLabel='einfach eggstastisch';
  const buttonText = document.createElement('span');
  buttonText.innerText = "Jetzt";
  buttonText.className = 'eggs-header-button-text eggs-header-button-text--bigger';
  const buttonText2 = document.createElement('span');
  buttonText2.innerText = "Beratungstermin ausmachen";
  buttonText2.className = 'eggs-header-button-text';
  const buttonIcon = document.createElement('div');
  buttonIcon.className = 'eggs-header-button-icon';
  buttonIcon.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" fill="none" viewBox="0 0 24 24"><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.05 6A5 5 0 0 1 18 9.95M14.05 2A9 9 0 0 1 22 9.94M18.5 21C9.94 21 3 14.06 3 5.5c0-.386.014-.77.042-1.148.032-.435.048-.653.162-.851a1.06 1.06 0 0 1 .432-.402C3.842 3 4.082 3 4.562 3h2.817c.404 0 .606 0 .779.066a1 1 0 0 1 .396.278c.122.14.191.33.329.71l1.166 3.206c.16.442.24.662.227.872a1 1 0 0 1-.182.513c-.121.171-.323.292-.725.534L8 10a12.1 12.1 0 0 0 6 6l.821-1.369c.242-.402.363-.604.534-.725a1 1 0 0 1 .513-.182c.21-.014.43.066.872.227l3.207 1.166c.38.138.569.207.709.329a.999.999 0 0 1 .277.396c.067.173.067.375.067.779v2.817c0 .48 0 .72-.1.926a1.06 1.06 0 0 1-.401.432c-.198.114-.416.13-.85.162-.38.028-.763.042-1.149.042Z"/></svg>';

  aTag.append(buttonwrapper);
  buttonwrapper.append(button);
  button.append(buttonText);
  button.append(buttonText2);
  button.append(buttonIcon);

  block.append(nav);
  block.append(aTag);
  block.firstElementChild.remove();
}
