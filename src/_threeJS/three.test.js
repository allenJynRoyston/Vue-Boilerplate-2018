var __three = {
    init(props){
      let {ele, component, width, height} = props;

      // declare variables
      let scene = new THREE.Scene(),
          dimensions = {width: width, height: height},
          camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 ),
          renderer = new THREE.WebGLRenderer(),
          geometry = new THREE.BoxGeometry( 1, 1, 1 ),
          material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ),
          cube = new THREE.Mesh( geometry, material );
          
      //-----------------------
      const create = () => {
        renderer.setSize( dimensions.width, dimensions.height );
        ele.appendChild( renderer.domElement );
        scene.add( cube );
        camera.position.z = 5;
      }
      //-----------------------

      //-----------------------
      const animate = () => {        
          requestAnimationFrame( animate );
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
          renderer.render(scene, camera);       
      };
      //-----------------------

      create();
      animate();
    }
}
