export class VJScriptLoader {
  constructor(){      

  }
  async loadFile(file){
      await new Promise((resolve, reject) => {
        let js = document.createElement("script");
            js.type = "text/javascript";
            js.src = file;
            document.body.appendChild(js);
            js.onload = (() => {
              resolve()
            })
      })    
  }

}