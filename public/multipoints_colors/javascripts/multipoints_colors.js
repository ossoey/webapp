
const VSH =  new Ebika().VERTEX_SHADER.toString();

const FSH =  new Ebika().FRAGMENT_SHADER.toString();



Ebika.Projects.WebGL1MultiPoints_colors   = class EbikaProjectsWebGL1MultiPoints_colors    extends Ebika   {
    constructor(paramsIn) {
        super();
        this.shdProg     = new Ebika.ShaderProgramNBuffer ({canvasId:paramsIn.canvasId, shadersSources: paramsIn.shadersSources});
        this.clearColor   = paramsIn.clearColor;
    };

    draw() {
       let   angle = 90;

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


        function initBufferBlock(gl,program) {

            let  dataBlock = new Float32Array(
                [   0.0, 0.5,  1.0, 0.0, 0.0,   25.0, 0.0,
                             -0.5, -0.5, 0.0, 1.0, 0.0 ,    20.0, 0.0,
                              0.5, -0.5 , 0.0, 0.0, 1.0 ,   15.0, 0.0,

                    0.0, 0.45,  10.8, 0.0, 0.0,   20.0, 1.0,
                    -0.45, -0.45, 0.0, 10.8, 0.0 ,    13.0, 1.0,
                    0.45, -0.45 , 0.0, 0.0, 10.8 ,   9.0, 1.0
                ]);
            let  count = 6;
            let  SIZE_PER_ELT  = dataBlock.BYTES_PER_ELEMENT
            let  bufferBlock    = gl.createBuffer();
            if (!bufferBlock) {  console.log('Failed to create the buffer object '); return -1; };
            gl.bindBuffer(gl.ARRAY_BUFFER, bufferBlock);
            gl.bufferData(gl.ARRAY_BUFFER, dataBlock, gl.STATIC_DRAW);

            let a_Position = gl.getAttribLocation(program, 'a_Position');
            gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, SIZE_PER_ELT*7, 0);
            gl.enableVertexAttribArray(a_Position);


            let a_Color = gl.getAttribLocation(program, 'a_Color');
            gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, SIZE_PER_ELT*7, SIZE_PER_ELT*2);
            gl.enableVertexAttribArray(a_Color);


            let a_PointSize = gl.getAttribLocation(program, 'a_PointSize');
            gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, SIZE_PER_ELT*7, SIZE_PER_ELT*5);
            gl.enableVertexAttribArray(a_PointSize);

            let a_triangle_index = gl.getAttribLocation(program, 'a_triangle_index');
            gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, SIZE_PER_ELT*7, SIZE_PER_ELT*6);
            gl.enableVertexAttribArray(a_PointSize);

            return  count
        };

        function initRotation(gl,program) {

           let radian = Math.PI * angle / 180.0;
           let cosB = Math.cos(radian), sinB = Math.sin(radian);

            var rot_x_Matrix = new Float32Array([
                cosB, sinB, 0.0, 0.0,
                -sinB, cosB, 0.0, 0.0,
                0.0,  0.0, 1.0, 0.0,
                0.0,  0.0, 0.0, 1.0
            ]);


            var u_rot_x_Matrix= gl.getUniformLocation(program, 'u_rot_x_Matrix');
            if (!u_rot_x_Matrix) {
                console.log('Failed to get the storage location of u_rot_x_Matrix');
                return;
            }
            gl.uniformMatrix4fv(u_rot_x_Matrix, false, rot_x_Matrix);
        };

        function drawWithMultipleBuffers(gl,program) {
            let n = initVertexBuffers(gl,program);
            if (n < 0) {  console.log('Failed to set the positions of the vertices'); return;  }

            let sizesCount = initSizesBuffers(gl,program);
            if (sizesCount < 0) {  console.log('Failed to set the size of the vertices'); return;  }


            let colorsCount = initColorsBuffers(gl,program);
            if (colorsCount < 0) {  console.log('Failed to set the colors of the vertices'); return;  }

            initRotation(gl,program);

            return n;

        } ;

        function drawWithSingleBuffer(gl,program) {
            let n = initBufferBlock(gl,program)
            if (n < 0) {  console.log('Failed to set the positions of the vertices'); return;  }
            initRotation(gl,program);
            return n;
        } ;

        function drawRecords (obj,paramsIn) {

            let n;

            obj.shdProg.gl.clearColor( obj.clearColor[0],obj.clearColor[1],obj.clearColor[2],obj.clearColor[3]);

            obj.shdProg.gl.clear( obj.shdProg.gl.COLOR_BUFFER_BIT);

            if   (paramsIn.bufferStyle == "MULTIPLE" ) {

                n = drawWithSingleBuffer( obj.shdProg.gl, obj.shdProg.program)

            }
            else if (paramsIn.bufferStyle == "ONE" ) {

                n = drawWithSingleBuffer( obj.shdProg.gl, obj.shdProg.program)

            };

            obj.shdProg.gl.drawArrays(obj.TRIANGLES, 0, n);
        }

        this.shdProg.ini();

        drawRecords (this,{bufferStyle: "ONE" } );

    };
};



let shadersSources = {};
 shadersSources[VSH] = `attribute vec4 a_Position;
                       uniform mat4 u_rot_x_Matrix;
                       attribute float a_PointSize;
                       attribute float a_triangle_index;
                       attribute vec4 a_Color;
                       varying  vec4 v_Color; 
                       void main() {
                          gl_Position = u_rot_x_Matrix*a_Position;
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
    clearColor: [0.,0.,0.,1.],
});

function main() {

    multipoints.shdProg.canvasFullScreen();
    multipoints.draw();
}