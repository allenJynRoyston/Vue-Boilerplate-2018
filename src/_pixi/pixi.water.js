var __pixi = {
    init(props){
        let {ele, component, width, height} = props;
        let app = new PIXI.Application(width, height, {backgroundColor : 0x1099bb});
        component.pixiInstance = app
        ele.appendChild(app.view);
        let {stage, renderer} = app
      
        var speed = 5;
	    
        var texture = PIXI.Texture.fromImage('src/_assets/images/underwater.jpg');
      
        var image = new PIXI.Sprite(texture);
        image.scale.set(2, 2);

        var displacementSprite = PIXI.Sprite.fromImage("src/_assets/images/water.png");        
        displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;	
      
        
        var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
        // Add our filter and sprites to stage	
        app.stage.filters = [displacementFilter];
        app.stage.addChild(displacementSprite);
        app.stage.addChild(image);  
        
        app.ticker.add((delta) => {  
          displacementSprite.x += speed
          displacementSprite.y += speed;
        })

    }
}
