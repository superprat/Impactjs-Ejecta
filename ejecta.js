ig.module(
    'plugins.animation'
)
.requires(
    'impact.animation'
)
.defines(function(){ "use strict";
 
ig.Animation.inject({
 
    init: function(path, width, height){
        this.width = width;
        this.height = height;
 
        if (path instanceof Array) {
            this.image = [];
            for (var imageLoop = 0 ; imageLoop < path.length; imageLoop++) {
                this.image.push(new ig.Image(path[imageLoop]));
            }
        } else {
            this.image = new ig.Image(path);
        }
    },
 
    draw: function(targetX, targetY){
        var bbsize = Math.max(this.sheet.width, this.sheet.height);
 
        // On screen?
        if(
            targetX > ig.system.width || targetY > ig.system.height ||
            targetX + bbsize < 0 || targetY + bbsize < 0
        ) {
            return;
        }
 
        if( this.alpha != 1) {
            ig.system.context.globalAlpha = this.alpha;
        }
 
        if (this.angle === 0) {
            if (this.sheet.image instanceof Array) {
                this.sheet.image[this.tile].drawTile(
                    targetX, targetY,
                    0,this.sheet.width,this.sheet.height,
                    this.flip.x,this.flip.y
                );
            } else {
                this.sheet.image.drawTile(
                    targetX, targetY,
                    this.tile, this.sheet.width, this.sheet.height,
                    this.flip.x, this.flip.y
                );
            }
        } else {
            ig.system.context.save();
            ig.system.context.translate(
                ig.system.getDrawPos(targetX + this.pivot.x),
                ig.system.getDrawPos(targetY + this.pivot.y)
            );
            ig.system.context.rotate(this.angle);
            if (this.sheet.image instanceof Array) {
                this.sheet.image[this.tile].drawTile(
                    -this.pivot.x, -this.pivot.y,
                    0,this.sheet.width,this.sheet.height,
                    this.flip.x, this.flip.y
                );
            } else {
                this.sheet.image.drawTile(
                    -this.pivot.x, -this.pivot.y,
                    this.tile, this.sheet.width, this.sheet.height,
                    this.flip.x, this.flip.y
                );
            }
        }
 
        if (this.alpha != 1) {
            ig.system.context.globalAlpha = 1;
        }
    }
 
});
 
});
