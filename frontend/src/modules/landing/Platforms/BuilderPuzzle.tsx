import type { JSX } from 'react';

export function BuilderPuzzle(): JSX.Element {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 455 472"
      fill="none"
      // remove small gap
      // ref: https://stackoverflow.com/questions/24626908/how-to-get-rid-of-extra-space-below-svg-in-div-element
      display="block"
      style={{ margin: 'auto' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 79.9999C0 35.8172 35.8172 0 80 0H227.5V235.661H0V79.9999Z"
        fill="#00C38B"
      ></path>
      <path
        d="M227.5 235.661H455V391.323C455 435.506 419.183 471.323 375 471.323H227.5V235.661Z"
        fill="#C658D0"
      ></path>
      <path
        d="M227.5 0H375C419.183 0 455 35.8172 455 80V235.661H227.5V0Z"
        fill="#FA5B7D"
      ></path>
      <path
        d="M0 235.661H227.5V471.323H80C35.8172 471.323 0 435.506 0 391.323V235.661Z"
        fill="#56B0F8"
      ></path>
      <path
        d="M66.4842 210.912L98.8711 235.93H34.0972L66.4842 210.912Z"
        fill="#56B0F8"
      ></path>
      <path
        d="M161.016 260.411L193.403 235.392H128.629L161.016 260.411Z"
        fill="#00C38B"
      ></path>
      <path
        d="M251.393 118.369L227.24 84.82L227.24 151.918L251.393 118.369Z"
        fill="#00C38B"
      ></path>
      <path
        d="M341.769 260.411L374.156 235.392H309.382L341.769 260.411Z"
        fill="#FA5B7D"
      ></path>
      <path
        d="M251.393 354.03L227.24 387.579L227.24 320.481L251.393 354.03Z"
        fill="#56B0F8"
      ></path>
    </svg>
  );
}
