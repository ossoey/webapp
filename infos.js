(function() {
    module.exports.getInfos = function(paramsIn) {

        return {
            lib:  {
                ebika : { name: "EBIKA",
                          labName: "LABORATOIRE EBIKA"
                }
            },
            allProjects : [
                {
                    id    : "simpleborders",
                    description : 'GÉNÉRATEUR DES BORDURES DE POLYGONES',
                    image: '/image/simpleborders'

                }   ,
                {
                    id    : "simplestpolesportions",
                    description : "VECMENTATIONS - SEGMENTATION VECTORIELLES ",
                    image: '/image/simplestpolesportions'
                }    ,
                {
                    id    : "simplestsegmentations",
                    description : "SEGMENTATIONS GÉOMÉTRIQUES",
                    image: '/image/simplestsegmentations'
                }    ,

                {
                    id    : "simplestmultipoints",
                    description : "WEBGL, MULTIPOINTS SIMPLES",
                    image: '/image/simplestmultipoints'
                }    ,

                {
                    id    : "simplestpoint",
                    description : "WEBGL, POINT SIMPLE",
                    image: '/image/simplestpoint'
                }
            ]    ,

            locateProject : function (id) {
                let found = false;
                let projectIndex = 0;
                result = false;
                while ((!found) && ( projectIndex< this.allProjects.length)) {
                    if ( this.allProjects[projectIndex].id == id ) {
                        result = this.allProjects[projectIndex]
                        found = true;
                    };
                    projectIndex++;
                };
                return result;
            }
        };
    }

}());