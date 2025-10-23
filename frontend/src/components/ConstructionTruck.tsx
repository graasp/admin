import { type JSX, useState } from 'react';

import { Box, styled } from '@mui/material';

const MovingBox = styled(Box)({
  animation: 'move 40s linear infinite',
  bottom: '0px',
  right: '-200px',
  '@keyframes move': {
    from: {
      transform: 'translate(50vw,130px)',
    },
    to: {
      transform: 'translate(calc(-50vw - 200px), 130px)',
    },
  },
  // stop the animation on hover
  '&:hover': {
    animationPlayState: 'paused',
  },
});

const ShakingBox = styled(Box)({
  animation: 'shake 50ms linear infinite',
  '@keyframes shake': {
    '0%': { transform: 'rotate(0deg) translate(0,0)' },
    '25%': { transform: 'rotate(1deg) translate(0,0)' },
    '50%': { transform: 'rotate(0deg) translate(0,1px)' },
    '75%': { transform: 'rotate(-1deg) translate(0,0)' },
    '100%': { transform: 'rotate(0deg) translate(0,0)' },
  },
});

export function ConstructionAnimation(): JSX.Element {
  const [working, setWorking] = useState(true);

  if (working) {
    return (
      <MovingBox
        onClick={() => {
          setWorking(false);
        }}
      >
        <ShakingBox>
          <ConstructionTruck size={100} />
        </ShakingBox>
      </MovingBox>
    );
  }

  return <Box height="106px" />;
}

type ConstructionTruckProps = {
  size: number;
};
export function ConstructionTruck({
  size,
}: Readonly<ConstructionTruckProps>): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 500 500"
    >
      <style>
        {`.cls1{fill:#263238; stroke:#263238; stroke-linecap:round; stroke-linejoin:round;}
.cls2{fill:#FCDA2D; stroke:#263238; stroke-linecap:round; stroke-linejoin:round;}
.cls3{fill:none; stroke:#263238; stroke-linecap:round; stroke-linejoin:round;}
.cls4{fill:#fff; stroke:#263238; stroke-linecap:round; stroke-linejoin:round;}`}
      </style>
      <g id="freepik--Construction_truck_1--inject-34">
        <g>
          <path
            d="M101.09,396.1l6.64,10.51H245.5l13.28-5.53h29.32s8.3,12.17,32.64,10.51v-24.9H96.11l4.98,9.41Z"
            className="cls1"
          ></path>
          <rect
            x="90.32"
            y="340.51"
            width="283.09"
            height="53.21"
            className="cls1"
          ></rect>
          <rect
            x="251.47"
            y="351.42"
            width="48.81"
            height="42.47"
            className="cls2"
          ></rect>
          <g>
            <polygon
              id="frontHood"
              points="134.81 316.52 66.2 328.84 66.2 393.72 90.32 393.72 90.32 361.72 208.24 361.72 208.24 322.95 134.81 316.52"
              className="cls2"
            ></polygon>
            <line
              x1="66.25"
              y1="381.21"
              x2="90.53"
              y2="381.21"
              className="cls3"
            ></line>
            <polyline
              points="90.32 361.72 90.32 348.39 126.84 348.39"
              className="cls3"
            ></polyline>
          </g>
          <polygon
            id="cabin"
            points="137.22 254.99 141.9 302.09 131.24 312.13 131.24 341.83 210.1 341.83 210.1 302.09 210.22 302.09 210.22 254.99 137.22 254.99"
            className="cls2"
          ></polygon>
          <polygon
            points="163.51 296.06 143.91 296.06 140.44 261.69 163.51 261.69 163.51 296.06"
            className="cls4"
          ></polygon>
          <rect
            id="door"
            x="166.69"
            y="261.69"
            width="38.52"
            height="58.45"
            className="cls2"
          ></rect>
          <rect
            id="doorWindow"
            x="169.36"
            y="265.37"
            width="33.18"
            height="30.99"
            className="cls4"
          ></rect>
          <rect
            x="125.6"
            y="343.88"
            width="2.47"
            height="17.89"
            className="cls2"
          ></rect>
          <path
            id="railing"
            d="M155.45,298.26h-29.51v43.58h2.37v-20.47h8.32v21.51h2.37v-21.51h23.15v20.29h2.37v-35.4l-9.05-7.99Zm-27.14,20.67v-18.23h8.32v18.23h-8.32Zm10.68,0v-18.23h15.59l7.56,6.68v11.55h-23.15Z"
            className="cls2"
          ></path>
          <polygon
            id="frontFender"
            points="222.43 353.75 224.61 353.75 214.53 340.51 125.6 340.51 125.6 346.9 214.53 346.9 222.43 353.75"
            className="cls2"
          ></polygon>
          <rect
            x="60.51"
            y="392.61"
            width="34.55"
            height="10.49"
            className="cls2"
          ></rect>
          <path
            id="haulBody"
            d="M447.35,249.66H222.97v-9l-55.91-17.98-30.89-.54v21.58h-4.72v6.48h4.72s76.56,2.29,74.05,4.8l4.31,85.51h158.88l92.58-48.76-18.64-42.09Z"
            className="cls2"
          ></path>
          <g>
            <polygon
              points="264.49 276.96 279.17 334.82 295.89 334.82 281.21 276.96 264.49 276.96"
              className="cls1"
            ></polygon>
            <polygon
              points="452.39 293.28 448.37 276.96 431.66 276.96 437.61 300.92 452.39 293.28"
              className="cls1"
            ></polygon>
            <polygon
              points="422.81 308.49 414.94 276.96 398.22 276.96 408.03 316.13 422.81 308.49"
              className="cls1"
            ></polygon>
            <polygon
              points="231.06 276.96 245.74 334.82 262.46 334.82 247.78 276.96 231.06 276.96"
              className="cls1"
            ></polygon>
            <polygon
              points="393.19 323.85 381.51 276.96 364.79 276.96 378.42 331.49 393.19 323.85"
              className="cls1"
            ></polygon>
            <polygon
              points="297.93 276.96 312.6 334.82 329.32 334.82 314.64 276.96 297.93 276.96"
              className="cls1"
            ></polygon>
            <polygon
              points="331.36 276.96 346.04 334.82 362.75 334.82 348.07 276.96 331.36 276.96"
              className="cls1"
            ></polygon>
          </g>
          <g>
            <polygon
              points="262.42 276.96 277.09 334.82 293.81 334.82 279.13 276.96 262.42 276.96"
              className="cls2"
            ></polygon>
            <polygon
              points="450.65 294.12 446.29 276.96 429.58 276.96 435.87 301.76 450.65 294.12"
              className="cls2"
            ></polygon>
            <polygon
              points="421.09 309.4 412.86 276.96 396.15 276.96 406.31 317.04 421.09 309.4"
              className="cls2"
            ></polygon>
            <polygon
              points="228.98 276.96 243.66 334.82 260.38 334.82 245.7 276.96 228.98 276.96"
              className="cls2"
            ></polygon>
            <polygon
              points="391.53 324.69 379.43 276.96 362.71 276.96 376.76 332.33 391.53 324.69"
              className="cls2"
            ></polygon>
            <polygon
              points="295.85 276.96 310.53 334.82 327.24 334.82 312.56 276.96 295.85 276.96"
              className="cls2"
            ></polygon>
            <polygon
              points="329.28 276.96 343.96 334.82 360.67 334.82 346 276.96 329.28 276.96"
              className="cls2"
            ></polygon>
          </g>
          <line
            x1="216.71"
            y1="276.96"
            x2="455.22"
            y2="276.96"
            className="cls3"
          ></line>
          <polygon
            points="215.09 265.84 218.85 265.84 214.32 246.61 167.55 246.61 170.46 250.27 211.43 250.27 215.09 265.84"
            className="cls2"
          ></polygon>
          <g>
            <polygon
              points="95.06 392.61 141.35 372.24 141.35 388.93 95.06 403.1 95.06 392.61"
              className="cls2"
            ></polygon>
            <g id="frontTire">
              <circle
                cx="175.88"
                cy="400.71"
                r="50.23"
                className="cls1"
              ></circle>
              <circle
                cx="175.88"
                cy="400.71"
                r="24.69"
                transform="translate(-231.83 241.73) rotate(-45)"
                className="cls2"
              ></circle>
              <circle
                cx="175.88"
                cy="400.71"
                r="17.78"
                className="cls2"
              ></circle>
            </g>
          </g>
          <path
            d="M231.81,351.42v58.95h19.65v-58.95h-19.65Zm17.35,56.47h-15.04v-11.14h15.04v11.14Zm0-13.39h-15.04v-12.05h15.04v12.05Zm0-14.3h-15.04v-12.05h15.04v12.05Zm0-14.3h-15.04v-11.99h15.04v11.99Z"
            className="cls2"
          ></path>
          <g id="backTire">
            <circle cx="354.45" cy="400.71" r="50.23" className="cls1"></circle>
            <circle
              cx="354.45"
              cy="400.71"
              r="24.69"
              transform="translate(-178.04 349.14) rotate(-42.97)"
              className="cls2"
            ></circle>
            <circle cx="354.45" cy="400.71" r="17.78" className="cls2"></circle>
          </g>
          <rect
            x="162.4"
            y="264.09"
            width="8.83"
            height="29.8"
            className="cls1"
          ></rect>
        </g>
      </g>
    </svg>
  );
}
