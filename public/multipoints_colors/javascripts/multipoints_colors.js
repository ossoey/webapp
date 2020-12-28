
const VSH =  new Ebika().VERTEX_SHADER.toString();

const FSH =  new Ebika().FRAGMENT_SHADER.toString();



Ebika.Projects.WebGL1MultiPoints_colors   = class EbikaProjectsWebGL1MultiPoints_colors    extends Ebika   {
    constructor(paramsIn) {
        super();
        this.shdProg     = new Ebika.ShaderProgramNBuffer ({canvasId:paramsIn.canvasId, shadersSources: paramsIn.shadersSources});
        this.clearColor   = paramsIn.clearColor;
    };

    draw() {


        function initVertexBuffers(gl,program) {
            let  vertices = new Float32Array([  0.0, 0.5, -0.5, -0.5, 0.5, -0.5 ]);
            let n = 3;
            let vertexBuffer = gl.createBuffer();
            if (!vertexBuffer) {  console.log('Failed to create the buffer object '); return -1; };
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
            let a_Position = gl.getAttribLocation(program, 'a_Position');
            gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(a_Position);
            return n;
        };

        function initSizesBuffers(gl,program) {

            let  sizes = new Float32Array([  25.0, 20.0, 15.0 ]);
            let  sizesCount = 3;
            let  sizesBuffer = gl.createBuffer();
            if (!sizesBuffer) {  console.log('Failed to create the buffer object '); return -1; };
            gl.bindBuffer(gl.ARRAY_BUFFER, sizesBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);
            let a_PointSize = gl.getAttribLocation(program, 'a_PointSize');
            gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(a_PointSize);
            return sizesCount;
        };

        function initColorsBuffers(gl,program) {

            let  colors = new Float32Array([ 1.0, 0.0, 0.0,
                                                       0.0, 1.0, 0.0 ,
                                                       0.0, 0.0, 1.0 ,
            ]);
            let  colorsCount = 3;
            let  colorsBuffer = gl.createBuffer();
            if (!colorsBuffer) {  console.log('Failed to create the buffer object '); return -1; };
            gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
            let a_Color = gl.getAttribLocation(program, 'a_Color');
            gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(a_Color);
            return colorsCount;
        };

        function drawAllRecords (obj) {
            obj.shdProg.gl.clearColor( obj.clearColor[0],obj.clearColor[1],obj.clearColor[2],obj.clearColor[3]);
            obj.shdProg.gl.clear( obj.shdProg.gl.COLOR_BUFFER_BIT);

            let n = initVertexBuffers(obj.shdProg.gl,obj.shdProg.program);
            if (n < 0) {  console.log('Failed to set the positions of the vertices'); return;  }

            let sizesCount = initSizesBuffers(obj.shdProg.gl,obj.shdProg.program);
            if (sizesCount < 0) {  console.log('Failed to set the size of the vertices'); return;  }


            let colorsCount = initColorsBuffers(obj.shdProg.gl,obj.shdProg.program);
            if (colorsCount < 0) {  console.log('Failed to set the colors of the vertices'); return;  }

            obj.shdProg.gl.drawArrays(obj.LINE_LOOP, 0, n);
            // };
        }


        this.shdProg.ini();
        drawAllRecords (this);
    };
};



let shadersSources = {};
 shadersSources[VSH] = `attribute vec4 a_Position;
                       attribute float a_PointSize;
                       attribute vec4 a_Color;
                       varying  vec4 v_Color; 
                       void main() {
                          gl_Position = a_Position;
                          //gl_PointSize = 15.0;
                          gl_PointSize = a_PointSize;
                          v_Color  = a_Color;
                        }`;

shadersSources[FSH] = `precision mediump float;
              //uniform vec4 u_FragColor;
                varying  vec4 v_Color; 
              void main() {
               gl_FragColor = v_Color;
                // gl_FragColor = vec4(1.0,0.3,0.6,1.0);//gl_FragColor = u_FragColor;
               
               }`;

let multipoints = new Ebika.Projects.WebGL1MultiPoints_colors   ({canvasId:'canvasid',
    shadersSources: shadersSources,
    clearColor: [0.,0.,0.,1.0],
    attributs : {
        position : {name:'a_Position',
            value:[-0.9,0.8,0.0],
            values:[],
            recordSize: 3,
        },
        pointSize : {name:'a_PointSize',value:5.0, values:[],  recordSize: 1,
        }
    } ,

    uniforms : {
        color : {name:'u_FragColor',
            value:[0.9,0.8,0.3,1.0],
            values:[],

            recordSize: 4,
        }
        ,
    }


});

function main() {

    multipoints.shdProg.canvasFullScreen();
    multipoints.draw();
}