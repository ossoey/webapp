

Ebika.Projects.WebGL1Tests   = class EbikaProjectsWebGL1Tests   extends Ebika   {
    constructor(paramsIn) {
        super();
        this.shdProg = new Ebika.ShaderProgram({canvasId:paramsIn.canvasId, shadersSources: paramsIn.shadersSources});

        this.polePortionsPosition = new Ebika.PolePortions ({
            // poles:[-0.9,0.9,0.0,
            //         0.9,0.9,0.0,
            //         -0.9,0.6,0.0,
            //          0.9,0.5,0.0,
            //         0.9,-0.9,0.0,
            //          -0.9,-0.9,0.0,
            //     -0.9,0.9,0.0,
            //     ],

            poles  : [
                -0.91 ,      -0.91,   0,
                -0.63 , -0.8,   0,
                 -0.5 ,      -0.5,   0,

                 0.2,     -0.3,  0 ,
                 0.91,       -0.91,  0 ,
                0.91,       -0.6,  0 ,
                0.3,     0.1,  0 ,
                0.91 ,      0.91,   0,
                -0.91 ,      0.91,   0,
                -0.6 ,    0.3,   0,
                -0.91 ,    -0.91,   0,
            ],


            dimension:3,
        });

         this.polePortionsColor= new Ebika.PolePortions ({
            poles:[0.9,0.8,0.3,1.0,
                    0.3,0.5,0.7,1.0],
            dimension:4,
        });
        this.polePortionsPointSize  = new Ebika.PolePortions ({
            poles:[3.1,0.8],
            dimension:1,
        });


        let segs =  new   Ebika.Segmentations();
        let ratios  =  segs.segmentate().normalized

      //  let ratios = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]; //  [ 0, 0.0009775171065493646, 0.002932551319648094, 0.006842619745845552, 0.01466275659824047, 0.030303030303030304, 0.06158357771260997, 0.1241446725317693, 0.24926686217008798, 0.4995112414467253,1 ]    //

        paramsIn.attributs.position.values = this.polePortionsPosition.getPositions({ratios:ratios  });
        paramsIn.attributs.pointSize.values = this.polePortionsPointSize.getPositions({ratios:ratios  });
        paramsIn.uniforms.color.values = this.polePortionsColor.getPositions({ratios:ratios });


        this.shdProg.attribIni({attribName:'position',paramsInTermsToSet:paramsIn});
        this.shdProg.attribIni({attribName:'pointSize',paramsInTermsToSet:paramsIn});
        this.shdProg.uniformIni({uniformName:'color',paramsInTermsToSet:paramsIn});
        this.clearColor = paramsIn.clearColor;
    };

    draw() {

        function  locateAndPassAttributElement (obj,paramsIn){
            let  recordIndex   = paramsIn.recordIndex;
            let  recordSize    = obj.shdProg.attributs[paramsIn.attribName].recordSize
            switch (recordSize) {
                case 1:  obj.shdProg.locateAndPassArrayAttribut1f({recordIndex:recordIndex, attribName:paramsIn.attribName});
                    break;
                case 3:  obj.shdProg.locateAndPassArrayAttribut3f({recordIndex:recordIndex, attribName:paramsIn.attribName});
                    break;
            }
        };

        function locateAndPassUniformElement (obj,paramsIn){

            let  recordIndex   = paramsIn.recordIndex;
            let  recordSize    = obj.shdProg.uniforms[paramsIn.uniformName].recordSize
            switch (recordSize) {
                case 4:  obj.shdProg.locateAndPassArrayUniform4f({recordIndex:recordIndex, uniformName:paramsIn.uniformName});
                    break;
            }
        };

        function locateAndPassElement (obj,paramsIn) {
            locateAndPassAttributElement(obj, {recordIndex: paramsIn.recordIndex, attribName: 'position'});
            locateAndPassAttributElement(obj, {recordIndex: paramsIn.recordIndex, attribName: 'pointSize'});
            locateAndPassUniformElement(obj, {recordIndex: paramsIn.recordIndex, uniformName: 'color'});
        }

        function drawAllRecords (obj) {
            obj.shdProg.gl.clearColor( obj.clearColor[0],obj.clearColor[1],obj.clearColor[2],obj.clearColor[3]);
            obj.shdProg.gl.clear( obj.shdProg.gl.COLOR_BUFFER_BIT);
            for (let recordIndex= 0;recordIndex<obj.shdProg.attributs['position'].recordCount;recordIndex++) {
                locateAndPassElement (obj, {recordIndex:recordIndex});
                obj.shdProg.gl.drawArrays(obj.shdProg.gl.POINTS,0,1);
            };
        }

        this.shdProg.ini();
        drawAllRecords (this);
    };
};






Ebika.Projects.WebGL1Borders_glinstances   = class EbikaProjectsWebGL1Borders_glinstances   extends Ebika   {
    constructor(paramsIn) {
        super();
        this.shdProg     = new Ebika.ShaderProgram({canvasId:paramsIn.canvasId, shadersSources: paramsIn.shadersSources});

        this.shdProgIns  = [new Ebika.ShaderProgram({canvasId:paramsIn.canvasId, shadersSources: paramsIn.shadersSources}),
                                  new Ebika.ShaderProgram({canvasId:paramsIn.canvasId, shadersSources: paramsIn.shadersSources})]

        let poles  = [
            -0.91 ,      -0.91,   0,
            -0.63 , -0.8,   0,
            -0.5 ,      -0.5,   0,
            0.2,     -0.3,  0 ,
            0.91,       -0.91,  0 ,
            0.91,       -0.6,  0 ,
            0.3,     0.1,  0 ,
            0.91 ,      0.91,   0,
            -0.91 ,      0.91,   0,
            -0.6 ,    0.3,   0,
        ];
        let bordersobj = new  Ebika.Borders();
        let borders    = bordersobj.getBorders({
            poles:  poles,
            scalingFactorRanges : [[0.3, 0.07] ] ,
            scalingFactorConvRanges  :  [[0,1] ]
        });

        poles = bordersobj.polesMerge({polesA: poles, polesB: borders});


        this.polePortionsPosition = new Ebika.PolePortions ({

            poles  : poles,

            dimension:3 ,

        });

        this.polePortionsColor= new Ebika.PolePortions ({
            poles:[0.9,0.8,0.3,1.0,
                0.3,0.5,0.7,1.0],
            dimension:4,
        });
        this.polePortionsPointSize  = new Ebika.PolePortions ({
            poles:[3.8,3.81],
            dimension:1,
        });

        // let bordersSub = function (poles) {
        //     let nested = {};
        //         nested.postionPortion =
        //
        //     return nested;
        // }


        let segs =  new   Ebika.Segmentations();
        let ratios  =  segs.segmentate().normalized


        paramsIn.attributs.position.values = this.polePortionsPosition.getPositions({ratios:ratios  });
        paramsIn.attributs.pointSize.values = this.polePortionsPointSize.getPositions({ratios:ratios  });
        paramsIn.uniforms.color.values = this.polePortionsColor.getPositions({ratios:ratios });


        this.shdProg.attribIni({attribName:'position',paramsInTermsToSet:paramsIn});
        this.shdProg.attribIni({attribName:'pointSize',paramsInTermsToSet:paramsIn});
        this.shdProg.uniformIni({uniformName:'color',paramsInTermsToSet:paramsIn});

        this.shdProgIns[0].attribIni({attribName:'position',paramsInTermsToSet:paramsIn});
        this.shdProgIns[0].attribIni({attribName:'pointSize',paramsInTermsToSet:paramsIn});
        this.shdProgIns[0].uniformIni({uniformName:'color',paramsInTermsToSet:paramsIn});

        this.shdProgIns[1].attribIni({attribName:'position',paramsInTermsToSet:paramsIn});
        this.shdProgIns[1].attribIni({attribName:'pointSize',paramsInTermsToSet:paramsIn});
        this.shdProgIns[1].uniformIni({uniformName:'color',paramsInTermsToSet:paramsIn});

        this.clearColor = paramsIn.clearColor;




    };

    draw() {

        function  locateAndPassAttributElement (obj,paramsIn){
            let  recordIndex   = paramsIn.recordIndex;
            let  recordSize    = obj.shdProg.attributs[paramsIn.attribName].recordSize
            switch (recordSize) {
                case 1:  obj.shdProg.locateAndPassArrayAttribut1f({recordIndex:recordIndex, attribName:paramsIn.attribName});
                         obj.shdProgIns[0].locateAndPassArrayAttribut1f({recordIndex:recordIndex, attribName:paramsIn.attribName});
                         obj.shdProgIns[1].locateAndPassArrayAttribut1f({recordIndex:recordIndex, attribName:paramsIn.attribName});
                    break;
                case 3:  obj.shdProg.locateAndPassArrayAttribut3f({recordIndex:recordIndex, attribName:paramsIn.attribName});
                         obj.shdProgIns[0].locateAndPassArrayAttribut3f({recordIndex:recordIndex, attribName:paramsIn.attribName});
                         obj.shdProgIns[1].locateAndPassArrayAttribut3f({recordIndex:recordIndex, attribName:paramsIn.attribName});
                    break;
            }
        };

        function locateAndPassUniformElement (obj,paramsIn){

            let  recordIndex   = paramsIn.recordIndex;
            let  recordSize    = obj.shdProg.uniforms[paramsIn.uniformName].recordSize
            switch (recordSize) {
                case 4:  obj.shdProg.locateAndPassArrayUniform4f({recordIndex:recordIndex, uniformName:paramsIn.uniformName});
                          obj.shdProgIns[0].locateAndPassArrayUniform4f({recordIndex:recordIndex, uniformName:paramsIn.uniformName});
                          obj.shdProgIns[1].locateAndPassArrayUniform4f({recordIndex:recordIndex, uniformName:paramsIn.uniformName});
                    break;
            }
        };

        function locateAndPassElement (obj,paramsIn) {
            locateAndPassAttributElement(obj, {recordIndex: paramsIn.recordIndex, attribName: 'position'});
            locateAndPassAttributElement(obj, {recordIndex: paramsIn.recordIndex, attribName: 'pointSize'});
            locateAndPassUniformElement(obj, {recordIndex: paramsIn.recordIndex, uniformName: 'color'});
        }

        function drawAllRecords (obj) {
            obj.shdProg.gl.clearColor( obj.clearColor[0],obj.clearColor[1],obj.clearColor[2],obj.clearColor[3]);
            obj.shdProg.gl.clear( obj.shdProg.gl.COLOR_BUFFER_BIT);

            obj.shdProgIns[0].gl.clearColor( obj.clearColor[0],obj.clearColor[1],obj.clearColor[2],obj.clearColor[3]);
            obj.shdProgIns[0].gl.clear( obj.shdProg.gl.COLOR_BUFFER_BIT);

            obj.shdProgIns[1].gl.clearColor( obj.clearColor[0],obj.clearColor[1],obj.clearColor[2],obj.clearColor[3]);
            obj.shdProgIns[1].gl.clear( obj.shdProg.gl.COLOR_BUFFER_BIT);


            for (let recordIndex= 0;recordIndex<obj.shdProg.attributs['position'].recordCount;recordIndex++) {
                locateAndPassElement (obj, {recordIndex:recordIndex});
                obj.shdProg.gl.drawArrays(obj.shdProg.gl.POINTS,0,1);
                obj.shdProgIns[0].gl.drawArrays(obj.shdProg.gl.POINTS,0,1);
                obj.shdProgIns[1].gl.drawArrays(obj.shdProg.gl.POINTS,0,1);
            };
        }

        this.shdProg.ini();
        drawAllRecords (this);
    };
};

Ebika.Projects.WebGL1Borders   = class EbikaProjectsWebGL1Borders   extends Ebika   {
    constructor(paramsIn) {
        super();
        this.shdProg = new Ebika.ShaderProgram({canvasId:paramsIn.canvasId, shadersSources: paramsIn.shadersSources});
        let poles  = [
            -0.91 ,      -0.91,   0,
            -0.63 , -0.8,   0,
            -0.5 ,      -0.5,   0,
            0.2,     -0.3,  0 ,
            0.91,       -0.91,  0 ,
            0.91,       -0.6,  0 ,
            0.3,     0.1,  0 ,
            0.91 ,      0.91,   0,
            -0.91 ,      0.91,   0,
            -0.6 ,    0.3,   0,
        ];
        let bordersobj = new  Ebika.Borders();
        let borders    = bordersobj.getBorders({
            poles:  poles,
            scalingFactorRanges : [[0.3, 0.07] ] ,
            scalingFactorConvRanges  :  [[0,1] ]
        });

        poles = bordersobj.polesMerge({polesA: poles, polesB: borders});


        this.polePortionsPosition = new Ebika.PolePortions ({

            poles  : poles,

            dimension:3,
        });

        this.polePortionsColor= new Ebika.PolePortions ({
            poles:[0.9,0.8,0.3,1.0,
                0.3,0.5,0.7,1.0],
            dimension:4,
        });
        this.polePortionsPointSize  = new Ebika.PolePortions ({
            poles:[1.9,1.8],
            dimension:1,
        });


        let segs =  new   Ebika.Segmentations();
        let ratios  =  segs.segmentate().normalized

        //  let ratios = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]; //  [ 0, 0.0009775171065493646, 0.002932551319648094, 0.006842619745845552, 0.01466275659824047, 0.030303030303030304, 0.06158357771260997, 0.1241446725317693, 0.24926686217008798, 0.4995112414467253,1 ]    //

        paramsIn.attributs.position.values = this.polePortionsPosition.getPositions({ratios:ratios  });
        paramsIn.attributs.pointSize.values = this.polePortionsPointSize.getPositions({ratios:ratios  });
        paramsIn.uniforms.color.values = this.polePortionsColor.getPositions({ratios:ratios });


        this.shdProg.attribIni({attribName:'position',paramsInTermsToSet:paramsIn});
        this.shdProg.attribIni({attribName:'pointSize',paramsInTermsToSet:paramsIn});
        this.shdProg.uniformIni({uniformName:'color',paramsInTermsToSet:paramsIn});
        this.clearColor = paramsIn.clearColor;
    };

    draw() {

        function  locateAndPassAttributElement (obj,paramsIn){
            let  recordIndex   = paramsIn.recordIndex;
            let  recordSize    = obj.shdProg.attributs[paramsIn.attribName].recordSize
            switch (recordSize) {
                case 1:  obj.shdProg.locateAndPassArrayAttribut1f({recordIndex:recordIndex, attribName:paramsIn.attribName});
                    break;
                case 3:  obj.shdProg.locateAndPassArrayAttribut3f({recordIndex:recordIndex, attribName:paramsIn.attribName});
                    break;
            }
        };

        function locateAndPassUniformElement (obj,paramsIn){

            let  recordIndex   = paramsIn.recordIndex;
            let  recordSize    = obj.shdProg.uniforms[paramsIn.uniformName].recordSize
            switch (recordSize) {
                case 4:  obj.shdProg.locateAndPassArrayUniform4f({recordIndex:recordIndex, uniformName:paramsIn.uniformName});
                    break;
            }
        };

        function locateAndPassElement (obj,paramsIn) {
            locateAndPassAttributElement(obj, {recordIndex: paramsIn.recordIndex, attribName: 'position'});
            locateAndPassAttributElement(obj, {recordIndex: paramsIn.recordIndex, attribName: 'pointSize'});
            locateAndPassUniformElement(obj, {recordIndex: paramsIn.recordIndex, uniformName: 'color'});
        }

        function drawAllRecords (obj) {
            obj.shdProg.gl.clearColor( obj.clearColor[0],obj.clearColor[1],obj.clearColor[2],obj.clearColor[3]);
            //obj.shdProg.gl.clearColor( 0.,0.,0.,1.);
            obj.shdProg.gl.clear( obj.shdProg.gl.COLOR_BUFFER_BIT);
            for (let recordIndex= 0;recordIndex<obj.shdProg.attributs['position'].recordCount;recordIndex++) {
                locateAndPassElement (obj, {recordIndex:recordIndex});
                obj.shdProg.gl.drawArrays(obj.shdProg.gl.POINTS,0,1);
            };
        }

        this.shdProg.ini();
        drawAllRecords (this);
    };
};

Ebika.Projects.WebGL1SimpleSegsPolePortions   = class EbikaProjectsWebGL1SimpleSegsPolePortions extends Ebika   {
    constructor(paramsIn) {
        super();
        this.shdProg = new Ebika.ShaderProgram({canvasId:paramsIn.canvasId, shadersSources: paramsIn.shadersSources});
        this.polePortionsPosition = new Ebika.PolePortions ({
            poles:[-0.9,0.9,0.0,
                0.9,0.9,0.0,
                0.9,-0.9,0.0,
                -0.9,-0.9,0.0,
                -0.9,0.9,0.0,
            ],
            dimension:3,
        });

        this.polePortionsColor= new Ebika.PolePortions ({
            poles:[0.9,0.8,0.3,1.0,
                0.3,0.5,0.7,1.0],
            dimension:4,
        });
        this.polePortionsPointSize  = new Ebika.PolePortions ({
            poles:[2.8, 6.2],
            dimension:1,
        });

        this.polePortionsPointSize  = new Ebika.PolePortions ({
            poles:[2.2,4.6],
            dimension:1,
        });


        let segs =  new  Ebika.Segmentations();
        let ratios  = segs.segmentate().randNormalized

       // let ratios = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

        paramsIn.attributs.position.values = this.polePortionsPosition.getPositions({ratios:ratios  });
        paramsIn.attributs.pointSize.values = this.polePortionsPointSize.getPositions({ratios:ratios  });
        paramsIn.uniforms.color.values = this.polePortionsColor.getPositions({ratios:ratios });


        this.shdProg.attribIni({attribName:'position',paramsInTermsToSet:paramsIn});
        this.shdProg.attribIni({attribName:'pointSize',paramsInTermsToSet:paramsIn});
        this.shdProg.uniformIni({uniformName:'color',paramsInTermsToSet:paramsIn});
        this.clearColor = paramsIn.clearColor;
    };

    draw() {

        function  locateAndPassAttributElement (obj,paramsIn){
            let  recordIndex   = paramsIn.recordIndex;
            let  recordSize    = obj.shdProg.attributs[paramsIn.attribName].recordSize
            switch (recordSize) {
                case 1:  obj.shdProg.locateAndPassArrayAttribut1f({recordIndex:recordIndex, attribName:paramsIn.attribName});
                    break;
                case 3:  obj.shdProg.locateAndPassArrayAttribut3f({recordIndex:recordIndex, attribName:paramsIn.attribName});
                    break;
            }
        };

        function locateAndPassUniformElement (obj,paramsIn){

            let  recordIndex   = paramsIn.recordIndex;
            let  recordSize    = obj.shdProg.uniforms[paramsIn.uniformName].recordSize
            switch (recordSize) {
                case 4:  obj.shdProg.locateAndPassArrayUniform4f({recordIndex:recordIndex, uniformName:paramsIn.uniformName});
                    break;
            }
        };

        function locateAndPassElement (obj,paramsIn) {
            locateAndPassAttributElement(obj, {recordIndex: paramsIn.recordIndex, attribName: 'position'});
            locateAndPassAttributElement(obj, {recordIndex: paramsIn.recordIndex, attribName: 'pointSize'});
            locateAndPassUniformElement(obj, {recordIndex: paramsIn.recordIndex, uniformName: 'color'});
        }

        function drawAllRecords (obj) {
            obj.shdProg.gl.clearColor( obj.clearColor[0],obj.clearColor[1],obj.clearColor[2],obj.clearColor[3]);
            obj.shdProg.gl.clear( obj.shdProg.gl.COLOR_BUFFER_BIT);
            for (let recordIndex= 0;recordIndex<obj.shdProg.attributs['position'].recordCount;recordIndex++) {
                locateAndPassElement (obj, {recordIndex:recordIndex});
                obj.shdProg.gl.drawArrays(obj.shdProg.gl.POINTS,0,1);
            };
        }

        this.shdProg.ini();
        drawAllRecords (this);
    };
};

Ebika.Projects.WebGL1SimplePolePortions   = class EbikaProjectsWebGL1SimplePolePortions  extends Ebika   {
    constructor(paramsIn) {
        super();
        this.shdProg = new Ebika.ShaderProgram({canvasId:paramsIn.canvasId, shadersSources: paramsIn.shadersSources});
        this.polePortionsPosition = new Ebika.PolePortions ({
            poles:[-0.9,0.9,0.0,
                0.9,0.9,0.0,
                0.9,-0.9,0.0,
                -0.9,-0.9,0.0,
                -0.9,0.9,0.0,
            ],
            dimension:3,
        });

        this.polePortionsColor= new Ebika.PolePortions ({
            poles:[0.9,0.8,0.3,1.0,
                0.3,0.5,0.7,1.0],
            dimension:4,
        });
        this.polePortionsPointSize  = new Ebika.PolePortions ({
            poles:[2.8, 6.2],
            dimension:1,
        });

        let ratios = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

        paramsIn.attributs.position.values = this.polePortionsPosition.getPositions({ratios:ratios  });
        paramsIn.attributs.pointSize.values = this.polePortionsPointSize.getPositions({ratios:ratios  });
        paramsIn.uniforms.color.values = this.polePortionsColor.getPositions({ratios:ratios });


        this.shdProg.attribIni({attribName:'position',paramsInTermsToSet:paramsIn});
        this.shdProg.attribIni({attribName:'pointSize',paramsInTermsToSet:paramsIn});
        this.shdProg.uniformIni({uniformName:'color',paramsInTermsToSet:paramsIn});
        this.clearColor = paramsIn.clearColor;
    };

    draw() {

        function  locateAndPassAttributElement (obj,paramsIn){
            let  recordIndex   = paramsIn.recordIndex;
            let  recordSize    = obj.shdProg.attributs[paramsIn.attribName].recordSize
            switch (recordSize) {
                case 1:  obj.shdProg.locateAndPassArrayAttribut1f({recordIndex:recordIndex, attribName:paramsIn.attribName});
                    break;
                case 3:  obj.shdProg.locateAndPassArrayAttribut3f({recordIndex:recordIndex, attribName:paramsIn.attribName});
                    break;
            }
        };

        function locateAndPassUniformElement (obj,paramsIn){

            let  recordIndex   = paramsIn.recordIndex;
            let  recordSize    = obj.shdProg.uniforms[paramsIn.uniformName].recordSize
            switch (recordSize) {
                case 4:  obj.shdProg.locateAndPassArrayUniform4f({recordIndex:recordIndex, uniformName:paramsIn.uniformName});
                    break;
            }
        };

        function locateAndPassElement (obj,paramsIn) {
            locateAndPassAttributElement(obj, {recordIndex: paramsIn.recordIndex, attribName: 'position'});
            locateAndPassAttributElement(obj, {recordIndex: paramsIn.recordIndex, attribName: 'pointSize'});
            locateAndPassUniformElement(obj, {recordIndex: paramsIn.recordIndex, uniformName: 'color'});
        }

        function drawAllRecords (obj) {
            obj.shdProg.gl.clearColor( obj.clearColor[0],obj.clearColor[1],obj.clearColor[2],obj.clearColor[3]);
            obj.shdProg.gl.clear( obj.shdProg.gl.COLOR_BUFFER_BIT);
            for (let recordIndex= 0;recordIndex<obj.shdProg.attributs['position'].recordCount;recordIndex++) {
                locateAndPassElement (obj, {recordIndex:recordIndex});
                obj.shdProg.gl.drawArrays(obj.shdProg.gl.POINTS,0,1);
            };
        }

        this.shdProg.ini();
        drawAllRecords (this);
    };
};

Ebika.Projects.WebGL1SimplestMultiPoints    = class EbikaProjectsWebGL1SimplestMultiPoints    extends Ebika   {
    constructor(paramsIn) {
        super();
        this.shdProg = new Ebika.ShaderProgram({canvasId:paramsIn.canvasId, shadersSources: paramsIn.shadersSources});
        this.shdProg.attribIni({attribName:'position',paramsInTermsToSet:paramsIn});
        this.shdProg.attribIni({attribName:'pointSize',paramsInTermsToSet:paramsIn});
        this.shdProg.uniformIni({uniformName:'color',paramsInTermsToSet:paramsIn});
        this.clearColor = paramsIn.clearColor;
        };

    draw() {

         function  locateAndPassAttributElement (obj,paramsIn){
            let  recordIndex   = paramsIn.recordIndex;
            let  recordSize    = obj.shdProg.attributs[paramsIn.attribName].recordSize
            switch (recordSize) {
                case 1:  obj.shdProg.locateAndPassArrayAttribut1f({recordIndex:recordIndex, attribName:paramsIn.attribName});
                    break;
                case 3:  obj.shdProg.locateAndPassArrayAttribut3f({recordIndex:recordIndex, attribName:paramsIn.attribName});
                    break;
            }
        };

        function locateAndPassUniformElement (obj,paramsIn){

            let  recordIndex   = paramsIn.recordIndex;
            let  recordSize    = obj.shdProg.uniforms[paramsIn.uniformName].recordSize
            switch (recordSize) {
                case 4:  obj.shdProg.locateAndPassArrayUniform4f({recordIndex:recordIndex, uniformName:paramsIn.uniformName});
                    break;
            }
        };

        function locateAndPassElement (obj,paramsIn) {
            locateAndPassAttributElement(obj, {recordIndex: paramsIn.recordIndex, attribName: 'position'});
            locateAndPassAttributElement(obj, {recordIndex: paramsIn.recordIndex, attribName: 'pointSize'});
            locateAndPassUniformElement(obj, {recordIndex: paramsIn.recordIndex, uniformName: 'color'});
        }

        function drawAllRecords (obj) {
            obj.shdProg.gl.clearColor( obj.clearColor[0],obj.clearColor[1],obj.clearColor[2],obj.clearColor[3]);
            obj.shdProg.gl.clear( obj.shdProg.gl.COLOR_BUFFER_BIT);
            for (let recordIndex= 0;recordIndex<obj.shdProg.attributs['position'].recordCount;recordIndex++) {
                locateAndPassElement (obj, {recordIndex:recordIndex});
                obj.shdProg.gl.drawArrays(obj.shdProg.gl.POINTS,0,1);
            };
        }

        this.shdProg.ini();
        drawAllRecords (this);
    };
};

Ebika.Projects.WebGL1DyniDrypoint    = class EbikaProjectsWebGL1Dynipoint  extends Ebika   {
    constructor(paramsIn) {
        super();
        this.shdProg = new Ebika.ShaderProgram({canvasId:paramsIn.canvasId, shadersSources: paramsIn.shadersSources});
        this.shdProg.attribIni({attribName:'position',paramsInTermsToSet:paramsIn});
        this.shdProg.attribIni({attribName:'pointSize',paramsInTermsToSet:paramsIn});
        this.shdProg.uniformIni({uniformName:'color',paramsInTermsToSet:paramsIn});
        this.clearColor = paramsIn.clearColor;
    };
    draw() {

        this.shdProg.ini();

        this.shdProg.locateAndPassAttribut3f({attribName:'position'});
        this.shdProg.locateAndPassAttribut1f({attribName:'pointSize'});
        this.shdProg.locateAndPassUniform4f({uniformName:'color'});

        this.shdProg.gl.clearColor( this.clearColor[0],this.clearColor[1],this.clearColor[2],this.clearColor[3]);
        this.shdProg.gl.clear( this.shdProg.gl.COLOR_BUFFER_BIT);
        this.shdProg.gl.drawArrays( this.shdProg.gl.POINTS,0,1)
    };
};

Ebika.Projects.WebGL1Dynipoint    = class EbikaProjectsWebGL1Dynipoint  extends Ebika   {
    constructor(paramsIn) {
        super();
        this.shdProg = new Ebika.ShaderProgram({canvasId:paramsIn.canvasId, shadersSources: paramsIn.shadersSources});
        this.shdProg.attributs.position = {};
        this.shdProg.attributs.position.name = paramsIn.attributs.position.name;
        this.shdProg.attributs.position.value = paramsIn.attributs.position.value;

        this.shdProg.attributs.pointSize = {};
        this.shdProg.attributs.pointSize.name = paramsIn.attributs.pointSize.name;
        this.shdProg.attributs.pointSize.value = paramsIn.attributs.pointSize.value;

        this.shdProg.uniforms.color  = {};
        this.shdProg.uniforms.color.name  = paramsIn.uniforms.color.name;
        this.shdProg.uniforms.color.value = paramsIn.uniforms.color.value;

    };
    draw() {

        this.shdProg.ini();

        this.shdProg.attributs.position.obj  = this.shdProg.gl.getAttribLocation(this.shdProg.program,  this.shdProg.attributs.position.name);
        if (this.shdProg.attributs.position.obj  < 0) {
            console.log('Failed to get the storage  ');
            return;
        };
        let value = this.shdProg.attributs.position.value;
        this.shdProg.gl.vertexAttrib3f(this.shdProg.attributs.position.obj,
            value[0], value[1], value[2]);


        this.shdProg.attributs.pointSize.obj  = this.shdProg.gl.getAttribLocation(this.shdProg.program,  this.shdProg.attributs.pointSize.name);
        if (this.shdProg.attributs.position.obj  < 0) {
            console.log('Failed to get the storage  ');
            return;
        };
        value = this.shdProg.attributs.pointSize.value;
        this.shdProg.gl.vertexAttrib1f(this.shdProg.attributs.pointSize.obj,
            value);


        this.shdProg.uniforms.color.obj  = this.shdProg.gl.getUniformLocation(this.shdProg.program,   this.shdProg.uniforms.color.name);
        if (this.shdProg.uniforms.color.obj  < 0) {
            console.log('Failed to get the storage  ');
            return;
        };

        value =this.shdProg.uniforms.color.value;
        this.shdProg.gl.uniform4f( this.shdProg.uniforms.color.obj ,
            value[0],value[1],value[2],value[3]);

        this.shdProg.gl.clearColor(0.0,0.0,0.0,1.0);
        this.shdProg.gl.clear( this.shdProg.gl.COLOR_BUFFER_BIT);
        this.shdProg.gl.drawArrays( this.shdProg.gl.POINTS,0,1)
    };
};