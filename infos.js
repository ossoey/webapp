(function() {
    module.exports.getInfos = function(paramsIn) {

        return {
            lib:  {
                ebika : { name: "EBIKA" }
            },
            allProjects : [
                {
                    id    : "borders",
                    description : 'GÉNÉRATEUR DES BORDURES DE POLYGONES',
                    image: '/image'


                }   ,
                {
                    id    : "polesportions",
                    description : "VECMENTATIONS - SEGMENTATION VECTORIELLES ",
                    image: '/image'
                }    ,
                {
                    id    : "segmentation",
                    description : "SEGMENTATIONS GÉOMÉTRIQUES",
                    image: '/image'
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