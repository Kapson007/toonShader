# Webpack THREE.js Template

## Setup

Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

``` bash
# Install dependencies (only for first time)
npm i

# Serve at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```

## Description

This project show cell shading thanks to toon shader which interpolates each point of texture and then computes appropriate value of color for all texture elements.
Effect is shown on te ball that is located above gray platform.There are two types of light that shine our objects. Point light and ambient light. User can steer with controlers properties: postion of lights, shade, position of objects, colors etc. Thanks to toon shader we can see that there are two various hues of blue on the ball. This is caused by shader and intensity of light. Depending of amount of light we can see that shader divide blue on two or more hues of the same color thanks to rigid boundaries of division of colors which are included in closed interval of numbers.

### Technologies

- THREE.js,
- Webpack,
- GLSL,
- CSS,
- HTML (with Canvas)
