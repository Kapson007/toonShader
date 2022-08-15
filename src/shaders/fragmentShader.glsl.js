const fragmentShader = `
    varying vec3 v_Normal;
    uniform vec3 sphereColour;

    void main(void) {
      // gl_FragColor = vec4(v_Normal, 1.0);
      gl_FragColor = vec4(sphereColour, 1.0);
    }
`;

export default fragmentShader;
