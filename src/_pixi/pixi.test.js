var __pixi = {
    init(props){
        let {ele, component, width, height} = props;
        let app = new PIXI.Application(width, height, {backgroundColor : 0x1099bb});
        component.pixiInstance = app
        ele.appendChild(app.view);
        
        let trailTexture = PIXI.Texture.fromImage('src/_assets/images/ninja-icon.png')
        let historyX = [];
        let historyY = [];
        let historySize = 20;
        let ropeSize = 100;
        let points = [];
        
        for( let i = 0; i < historySize; i++){
          historyX.push(0);
          historyY.push(0);
        }
        for(let i = 0; i < ropeSize; i++){
          points.push(new PIXI.Point(0,0));
        }
        
        //Create the rope
        let rope = new PIXI.mesh.Rope(trailTexture, points);
        rope.blendmode = PIXI.BLEND_MODES.ADD;        
        app.stage.addChild(rope);
        
        // Listen for animate update
        app.ticker.add((delta) => {
          // console.log(delta)
          let mouseposition = app.renderer.plugins.interaction.mouse.global;
          historyX.pop();
          historyX.unshift(mouseposition.x);
          historyY.pop();
          historyY.unshift(mouseposition.y);
          for( let i = 0; i < ropeSize; i++){
              let p = points[i];                            
              let ix = cubicInterpolation( historyX, i / ropeSize * historySize, 1);
              let iy = cubicInterpolation( historyY, i / ropeSize * historySize, 1);              
              p.x = ix;
              p.y = iy;              
          }
        });

        const clipInput = (k, arr) => {
          if (k < 0){ k = 0; }
          if (k > arr.length - 1){ k = arr.length - 1 }
          return arr[k];
        }
        
        const getTangent = (k, factor, array) => {
          return factor * (clipInput(k + 1, array) - clipInput(k - 1,array)) / 2;
        }
        
        const cubicInterpolation = (array, t, tangentFactor) => {
          if (tangentFactor == null){ tangentFactor = 1 }
          let k = Math.floor(t);
          let m = [getTangent(k, tangentFactor, array), getTangent(k + 1, tangentFactor, array)];
          let p = [clipInput(k,array), clipInput(k+1,array)];
          t -= k;
          let t2 = t * t;
          let t3 = t * t2;
          return (2 * t3 - 3 * t2 + 1) * p[0] + (t3 - 2 * t2 + t) * m[0] + ( -2 * t3 + 3 * t2) * p[1] + (t3 - t2) * m[1];
        }

    }
}
