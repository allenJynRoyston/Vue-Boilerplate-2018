import anime from "animejs";

export class VJSlider {
    constructor(ele) {       
        this.ele = ele;     
        this.previousImage = 0   
        this.currentImage = 0        
        this.options = {
            padding: (!!this.ele.getAttribute('padding')) ? parseInt(this.ele.getAttribute('padding')) : 0,
            speed: (!!this.ele.getAttribute('speed')) ? parseInt(this.ele.getAttribute('speed')) : 700,
            height: (!!this.ele.getAttribute('height')) ? parseInt(this.ele.getAttribute('height')) : 400,            
            type:  (!!this.ele.getAttribute('type')) ? this.ele.getAttribute('type') : 'slide',
            easing: (!!this.ele.getAttribute('easing')) ? this.ele.getAttribute('easing') : 'easeInOutQuart',
            size: (!!this.ele.getAttribute('size')) ? this.ele.getAttribute('size') : 'default',
            showText: (!!this.ele.getAttribute('text')) ? this.ele.getAttribute('text') === 'true' || this.ele.getAttribute('text')  === 'true' : true, 
            showControls: (!!this.ele.getAttribute('controls')) ? this.ele.getAttribute('controls')  === 'controls' || this.ele.getAttribute('controls')  === 'true' : false,
            showDots: (!!this.ele.getAttribute('dots')) ? this.ele.getAttribute('dots') === 'dots' || this.ele.getAttribute('dots')  === 'true' : false,
            arrowdots: (!!this.ele.getAttribute('arrowdots')) ? this.ele.getAttribute('arrowdots') === 'arrowdots' || this.ele.getAttribute('arrowdots')  === 'true': null, 
            autoplay:{
              active: (!!this.ele.getAttribute('autoplay')) ? this.ele.getAttribute('autoplay')  === 'autoplay' || this.ele.getAttribute('autoplay')  === 'true': false,
              delay: (!!this.ele.getAttribute('delay')) ? parseInt(this.ele.getAttribute('delay')) : 2000,
              interval: (!!this.ele.getAttribute('interval')) ? parseInt(this.ele.getAttribute('interval')) : 3000,
              event: null
            }
        }

        this.HTMLSnippets = {
          dots: '&squf;',
          leftarrowdot: '&ltrif;',
          rightarrowdot: '&rtrif;',
          leftbtn: '<',
          rightbtn: '>'
        }        

        this.cards = {
            ele: null,
            to: null, // top overlay
            bo: null,  // bottom overlay
            h: [],  // horizontal
            v: []  // vertical
        }
        this.buttons = {
            next: null,
            prev: null, 
            locked: false
        }
        this.texts = {
          header: null,
          footer: null, 
          ele: []
        }

        // grab from data blocks 
        this.images = [];
        this.ele.querySelectorAll('data').forEach(ele => {          
          let type = !!ele.getAttribute('type')  ? ele.getAttribute('type') : 'image'
          switch(type.toLowerCase()){
            case 'image':          
              const _image = ele.getAttribute('image');
              const _header = (!!ele.getAttribute('header')) ? ele.getAttribute('header') : '';
              const _footer = (!!ele.getAttribute('footer')) ? ele.getAttribute('footer') : '';
              const _easing = (!!ele.getAttribute('easing')) ? ele.getAttribute('easing') : 'easeInOutQuart';

              if(!!_image){
                this.images.push({src: _image, header: _header, footer: _footer, easing: _easing})
              }
            break
            case 'dots':
              this.HTMLSnippets.dots = !!ele.getAttribute('html') ? ele.getAttribute('html') : ''              
            break
            case 'leftarrowdot':
              this.HTMLSnippets.leftarrowdot = !!ele.getAttribute('html') ? ele.getAttribute('html') : ''              
            break  
            case 'rightarrowdot':
              this.HTMLSnippets.rightarrowdot = !!ele.getAttribute('html') ? ele.getAttribute('html') : ''              
            break      
            case 'rightbtn':
              this.HTMLSnippets.rightbtn = !!ele.getAttribute('html') ? ele.getAttribute('html') : ''              
            break  
            case 'leftbtn':
              this.HTMLSnippets.leftbtn = !!ele.getAttribute('html') ? ele.getAttribute('html') : ''              
            break                                    
          }
          // remove original image from dom
          this.ele.removeChild(ele);
        })  

        // if no image, causes error, so fill with defaults
        if(this.images.length === 0){
          this.images = [{src: ''}]
        }

        console.log()

        this.inputElements = []
        this.init()
    }


    getNext(amount = 1, sp = this.currentImage){
        let {images, currentImage} = this    
        return (sp + amount < images.length) ? (sp + amount) : this.getNext(amount - images.length)
    }

    getPrev(amount = 1, sp = this.currentImage){
        let {images, currentImage} = this
        return (currentImage - amount >= 0) ? (currentImage - amount) : this.getPrev(amount - images.length)
    }

    init(){             
        this.buildLayout()
        this.setActiveCard()
        this.markActiveDot()  
        this.loadText()    
        this.lock(false)
    }


    buildLayout(){
        let {ele, buttons, inputElements, cards, images, options} = this;
        this.randomId = `__slider_${Math.random().toString(36).substring(7)}`;

        // build horzintal layout
        let horizontalSlide = '';
        for(var i = 0; i < 3; i++){
            horizontalSlide += `
            <div class='__hs' style='width: calc(33.333334% - ${options.padding*2}px); height: calc(100% - ${options.padding*2}px); float: left;padding: ${options.padding}px;'>
                <div style='width: 100%;height: 100%; display: flex; align-items: center; justify-content: center;color: white;'>
                    
                </div>
            </div>
            `
        }
        
        // build vertical layout
        let verticalSlide = '';
        for(var i = 0; i < 3; i++){
            verticalSlide += `
        <div class='__vs' style='width: calc(100% - ${options.padding*2}px); height: calc(33.333334% - ${options.padding*2}px);padding: ${options.padding}px'>
            <div style='width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;color: white'>
            </div>
        </div>
        `     
        }   

        // build dots
        let dots = '';
        let _dotHTML = this.ele.querySelector('dots')        
        if(this.options.arrowdots){
          dots +=  `<button class='vj-slider--dots-item __arrowdots'>${this.HTMLSnippets.leftarrowdot}</button>`
        }
        for(let i = 0; i < this.images.length; i++){                    
          dots +=  `<button class='vj-slider--dots-item __dot'>${this.HTMLSnippets.dots}</button>`          
        }
        if(this.options.arrowdots){
          dots +=  `<button class='vj-slider--dots-item __arrowdots'>${this.HTMLSnippets.rightarrowdot}</button>`
        }        

        // build text
        let texts = '<div style="display: none"><p class="__texts"></p><p class="__texts"></p></div>';  // renders but doesn't show
        if(options.showText){ 
          texts = `          
          <div class='vj-slider--text-header-banner'>
            <p class='vj-slider--text-header __texts'></p>
          </div>
          <div class='vj-slider--text-footer-banner'>
            <p class='vj-slider--text-footer __texts'></p>
          </div>    
          `    
        }

        let _layout = document.createElement('div');
        _layout.innerHTML =`
        <!-- container -->
        <div id='${this.randomId}' class='vj-slider--container'>
          <div class='vj-slider vj-slider--${options.size === "default" ? 'default' : options.size === "small" ? 'small' : 'large'}''  style='width: 100%; padding: ${options.padding}px; position: relative; overflow: hidden'>
              
              <!-- UNDERLAY -->
              <div class='__underlay'></div>

              <!-- vertical -->
              <div style='position: absolute; top: 0; left: 0; width: 100%; height: 300%; transform: translateY(-33.33334%); display: ${this.determineType() === 'h' ? 'none' : 'block'}'>                
                  ${verticalSlide}        
              </div>

              <!-- horizontal -->
              <div style='position: absolute; top: 0; left: 0; width: 300%; height: 100%; transform: translateX(-33.33334%)' display: ${this.determineType() === 'h' ? 'block' : 'none'}'>                
                  ${horizontalSlide}                                
              </div>

              <!-- OVERLAY -->
              <div class='__overlay' style='position: absolute; top: 0; left: 0; width: 100%; height: 100%'>

              </div>
    
              <!-- BUTTONS -->
              <div class='vj-slider--button-left __button '>
                  <button class='icon'>
                  ${this.HTMLSnippets.leftbtn}
                  </button>
              </div>
              <div class='vj-slider--button-right __button '>
                  <button class='icon'>
                      ${this.HTMLSnippets.rightbtn}
                  </button>
              </div>     

              <!-- TEXTS -->
              ${texts}
 
              <!-- IMAGE LOADER -->
              <img alt='' class='__imagepreloader' style='position: absolute; opacity: 0; top: 0; left: 0; z-index: -1; pointer-events: none'/>
          </div>
          <!-- DOTS -->
          <div class='vj-slider--dots-container'>
              ${dots}
          </div>      
        </div>      
        `

        // remove old elements
        ele.parentNode.insertBefore( _layout, ele );
        ele.parentNode.removeChild(ele);

        // get elements
        cards.ele =  document.querySelector(`#${this.randomId}`);
        document.querySelectorAll(`#${this.randomId} .__hs`).forEach(ele => {
            cards.h.push(ele)
        })
        document.querySelectorAll(`#${this.randomId} .__vs`).forEach(ele => {
            cards.v.push(ele)
        })        

        document.querySelectorAll(`#${this.randomId} .__texts`).forEach((ele, index) => {   
          ele.updateText = (str) => {            
            ele.innerHTML = (str === null || str === undefined || str === '') ? '&nbsp;' : str
            anime({
              targets: ele.parentElement,
              duration: 300,
              easing: 'easeInSine',
              opacity: (str === null || str === undefined || str === '') ? 0 : 1             
            });   

          }       
          this.texts[index === 0 ? 'header' : 'footer'] = ele
          this.texts.ele.push(ele)
        })    
        

        // get button and attach actions
        document.querySelectorAll(`#${this.randomId} .__button, #${this.randomId} .__arrowdots`).forEach((ele, index) => {
            inputElements.push(ele)
            ele.addEventListener('click', () => {
              clearInterval(this.options.autoplay.event)              
              if(!buttons.locked){
                  this.lock(true)
                  index === 1 || index === 3 ? this.next() : this.prev()
              }
            })
        })  
        
        // get button and attach actions
        document.querySelectorAll(`#${this.randomId} .__dot`).forEach((ele, index) => {
            inputElements.push(ele)
            ele.addEventListener('click', () => {
              clearInterval(this.options.autoplay.event)
              if(!buttons.locked){     
                  if(index > this.currentImage){      
                  this.lock(true)
                  this.previousImage = this.currentImage
                  this.currentImage = index;                                                    
                  this.setImageOnCard(0, index )
                  this.animate(false, () => {})                    
                  }
                  if(index < this.currentImage){   
                  this.lock(true)
                  this.previousImage = this.currentImage
                  this.currentImage = index;                          
                  this.setImageOnCard(2, index )
                  this.animate(true, () => {})          
                  }
              }
            })
        })     
        
        // setup autoplay
        if(this.options.autoplay.active){
          setTimeout(() => {
            this.lock(true);this.next()            
            this.options.autoplay.event = setInterval(() => {
              if(!buttons.locked){
                this.lock(true);this.next()
              }
            }, this.options.autoplay.interval)
          }, this.options.autoplay.delay)
        }            
    }   


    
    setActiveCard(){
        let {images, cards, currentImage} = this;
        cards[this.determineType()].forEach((card, index) => {   
            if(index === 1){
                this.setImageOnCard(index, currentImage)             
            }                      
        })    
    }

    setImageOnCard(cardIndex = 0, imageIndex = 0, callback = () => {}){
        let {cards, images} = this;
        cards[this.determineType()][cardIndex].innerHTML = `
            <div style='background: url(${images[imageIndex].src}) no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover; width: 100%; height: 100%'></div>
        `   
        this.preloadImage(images[imageIndex].src, callback)
    }

    

    determineType(){
        let {options} = this
        return options.type === 'cascade' || options.type === 'waterfall' ? 'v' : 'h'
    }

    preloadImage(image, callback = () => {}){                
        var img = document.querySelector('.__imagepreloader')
        img.setAttribute('src', image)    
        img.setAttribute('alt', image)   
        const loadEL = () => {
            img.removeEventListener('load', loadEL)
            callback()            
        }
        const errorEL = () => {                   
            img.removeEventListener('error', errorEL)
            callback()            
        } 
    
        img.addEventListener('load', loadEL)
        img.addEventListener('error', errorEL)      
    }

    removeImageOnCard(cardIndex = 0){
        let {cards, images} = this;
        cards[this.determineType()][cardIndex].innerHTML = `
            <div style='width: 100%; height: 100%;'></div>
        `   
    }    

    setUnderlay(image, duration){
        let {randomId, options} = this
        let ele = document.querySelector(`#${randomId} .__underlay`);  

        // renders container (timer is to hide until ready)
        let _style = `position: absolute; top: 0; left: 0; width: 100%; height: 100%;`
        ele.setAttribute('style', `${_style}; opacity: 0`);
        setTimeout(() => {
            ele.setAttribute('style', `${_style}; opacity: 1`);
        }, duration - 10)

        // renders background image
        ele.innerHTML = `
            <div style='width: calc(100% - ${options.padding*2}px); height: calc(100% - ${options.padding*2}px); float: left;padding: ${options.padding}px;'>
                <div style='width: 100%;height: 100%; display: flex;align-items: center; justify-content: center;color: white;'>
                    <div style='background: url(${image}) no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover; width: 100%; height: 100%; opacity: 1'></div>
                </div>
            </div>                    
        `   
    }

    hideUnderlay(){
        let {randomId} = this
        let ele = document.querySelector(`#${randomId} .__underlay`);
        ele.innerHTML = `
            <div></div>
        `    
    }

    setOverlay(image, callback = () => {}){
        let {options, randomId} = this;
        let ele = document.querySelector(`#${randomId} .__overlay`);  
        ele.innerHTML = `
        <div style='width: calc(100% - ${options.padding*2}px); height: calc(100% - ${options.padding*2}px); float: left;padding: ${options.padding}px;'>
            <div style='width: 100%;height: 100%; display: flex;align-items: center; justify-content: center;color: white;'>
                <div style='background: url(${image}) no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover; width: 100%; height: 100%; opacity: 1;'></div>
            </div>
        </div>                    
        `           
        this.preloadImage(image, () => {
            callback()
        })
    }

    hideOverlay(){
        let {randomId} = this
        let ele = document.querySelector(`#${randomId} .__overlay`);
        ele.innerHTML = `
            <div></div>
        `   
    }


    animateText(reversed){
      let {options} = this
      this.texts.ele.forEach((ele, index) => {
        anime.timeline()
          .add({        
            targets: ele,
            duration: options.speed/2,
            easing: 'easeInSine',
            translateX: reversed ? 0 : index === 0 ? 5 : -5,
            opacity: reversed ? 1 : 0,
            delay: index*options.speed/4, 
            complete: () => {
              if(!reversed){
                this.loadText()
              }
            }
          });
      })      
    }

    loadText(){      
      let {texts, images, currentImage} = this;      
      texts.header.updateText(images[currentImage].header)
      texts.footer.updateText(images[currentImage].footer)
    }



    next(amount = 1){      
        let {images} = this;
        this.previousImage = this.currentImage
        this.currentImage = this.getNext(1)        
        this.setImageOnCard(0, this.currentImage, () => {
            this.animate(false, () => {
            
            })            
        })        
    }

    prev(amount = 1){
        let {images} = this;
        this.previousImage = this.currentImage
        this.currentImage = this.getPrev(1)    
        this.setImageOnCard(2, this.currentImage, () => {    
            this.animate(true, () => {
                
            })
        })
    }

    lock(state = false){
        let {options, buttons, inputElements} = this
        inputElements.forEach(ele => {
            if(ele.classList.contains('__button')){
              ele.setAttribute('style', `display: ${options.showControls ? 'visible' : 'none'}; opacity: ${state ? 0.65 : 1} `)
            }
            if(ele.classList.contains('__dot')){
              ele.setAttribute('style', `display: ${options.showDots ? 'visible' : 'none'};`)
            }            
        })
        buttons.locked = state
    }

    markActiveDot(){
        let {randomId, currentImage} = this
        document.querySelectorAll(`#${randomId} .__dot`).forEach((ele, index) => {     
            ele.classList.remove('vj-slider--dots-item--active', 'vj-slider--dots-item--inactive');
            ele.classList.add(currentImage === index ? 'vj-slider--dots-item--active' : 'vj-slider--dots-item--inactive');            
        })        
    }

    animate(reversed = false, callback = () => {}){
        let {images, currentImage, previousImage, randomId, cards, options} = this;
        let duration = options.speed;
        this.markActiveDot();
        this.animateText(false)
        
        const completed = () => {            
            setTimeout(() => {            
                this.resetPosition(true)
            }, 10)
            setTimeout(() => {
                this.setActiveCard()
                this.resetPosition(false)
            }, 50)
            setTimeout(() => {            
                this.hideUnderlay()
                this.lock(false)
                callback()
            }, 200)               
        }

        const end = () => {
          this.animateText(true)
        }

        // horizontal/overlay sliders
        if(this.determineType() === 'h'){

            switch(options.type){
                case 'slide':
                    this.setUnderlay(images[currentImage].src, duration)
                    cards[this.determineType()].forEach((card, index) => {
                        anime({
                            targets: card,
                            duration, 
                            easing: options.easing,
                            translateX: reversed ? `-100%` : `100%`,
                            complete: () => {
                                if(index === 1){
                                    completed();
                                    end()
                                }
                            }
                        });
                    })
                break
                case 'slip':
                    this.hideOverlay()
                    anime({
                        targets: document.querySelector(`#${randomId} .__overlay`),
                        duration: 0, 
                        translateX: reversed ? `-100%` : `100%`,
                        delay: 200                        
                    })                       
                    this.setOverlay(images[currentImage].src, () => {                                    
                        anime({
                            targets: document.querySelector(`#${randomId} .__overlay`),
                            easing: options.easing,
                            translateX: 0,
                            delay: 200,
                            complete: () => {
                                this.setActiveCard()
                                this.lock(false)
                                end()
                            }
                        })                                                
                    })
                break                
                case 'fade':                        
                    this.setOverlay(images[previousImage].src, () => {                       
                        this.setActiveCard()
                        anime.timeline()
                            .add({
                                targets: document.querySelector(`#${randomId} .__overlay`),
                                duration: 0, 
                                easing: 'linear',
                                opacity: 1,                                
                            })                    
                            .add({
                                targets: document.querySelector(`#${this.randomId} .__overlay`),
                                duration: duration, 
                                easing: 'linear',
                                opacity: 0,
                                complete: () => {
                                    this.lock(false)
                                    end()
                                }
                            })
                    })                                
                break  
                case 'grow':            
                    this.setOverlay(images[previousImage].src, () => {                       
                        this.setActiveCard()
                        anime.timeline()
                            .add({
                                targets: document.querySelector(`#${randomId} .__overlay`),
                                duration: 0, 
                                easing: 'linear',
                                opacity: 1,  
                                scale: 1                         
                            })                    
                            .add({
                                targets: document.querySelector(`#${randomId} .__overlay`),
                                duration: duration, 
                                easing: options.easing,
                                scale:  !reversed ? 1.25 : 0.95,
                                opacity: 0,
                                complete: () => {
                                    this.lock(false)
                                    end()
                                }
                            })
                    })                                
                break  
                case 'warp':            
                    this.setOverlay(images[previousImage].src, () => {                       
                        this.setActiveCard()
                        anime.timeline()
                            .add({
                                targets: document.querySelector(`#${randomId} .__overlay`),
                                duration: 0, 
                                easing: 'linear',
                                opacity: 1,  
                                rotate: 0                         
                            })                    
                            .add({
                                targets: document.querySelector(`#${randomId} .__overlay`),
                                duration: duration, 
                                easing: options.easing,
                                rotate:  !reversed ? 20 : -20,
                                scale:  !reversed ? 1.25 : 0.95,
                                opacity: 0,
                                complete: () => {
                                    this.lock(false)
                                    end()
                                }
                            })
                    })                                
                break  
                case 'leaf':            
                    this.setOverlay(images[previousImage].src, () => {                       
                        this.setActiveCard()
                        anime.timeline()
                            .add({
                                targets: document.querySelector(`#${randomId} .__overlay`),
                                duration: 0, 
                                easing: 'linear',
                                opacity: 1,  
                                rotate: 0                         
                            })                    
                            .add({
                                targets: document.querySelector(`#${randomId} .__overlay`),
                                duration: duration, 
                                easing: options.easing,
                                rotate:  reversed ? -45 : 45,
                                scale:  reversed ? 0.9 : 1.25,
                                translateX: reversed ? '-50%' : '50%',
                                translateY: reversed ? '-50%' : '50%',
                                opacity: 0,
                                complete: () => {
                                    this.lock(false)
                                    end()
                                }
                            })
                    })                                
                break        
                case 'warpspeed':            
                    this.setOverlay(images[currentImage].src, () => {                       
                        this.setActiveCard()
                        anime.timeline()
                            .add({
                                targets: document.querySelector(`#${randomId} .__overlay`),
                                duration: 0, 
                                easing: 'linear',
                                opacity: 1,  
                                scaleX: 100                         
                            })                    
                            .add({
                                targets: document.querySelector(`#${randomId} .__overlay`),
                                duration: duration, 
                                easing: options.easing,                                
                                scaleX: 5,
                                opacity: 0,
                                complete: () => {
                                    this.lock(false)
                                    end()
                                }
                            })
                    })                                
                break  
                case 'hyperzoom':            
                    this.setOverlay(images[currentImage].src, () => {                       
                        this.setActiveCard()
                        anime.timeline()
                            .add({
                                targets: document.querySelector(`#${randomId} .__overlay`),
                                duration: 0, 
                                easing: 'linear',
                                opacity: 1,  
                                scale: 100                         
                            })                    
                            .add({
                                targets: document.querySelector(`#${randomId} .__overlay`),
                                duration: duration, 
                                easing: options.easing,                                
                                scale: 1,
                                opacity: 1,
                                complete: () => {
                                    this.lock(false)
                                    end()
                                }
                            })
                    })                                
                break    
                case 'newsroom':            
                    this.setOverlay(images[currentImage].src, () => {                       
                        this.setActiveCard()
                        anime.timeline()
                            .add({
                                targets: document.querySelector(`#${randomId} .__overlay`),
                                duration: 0, 
                                easing: 'linear',
                                opacity: 1,  
                                scale: 10,
                                rotate: reversed ? -240 : 240                         
                            })                    
                            .add({
                                targets: document.querySelector(`#${randomId} .__overlay`),
                                duration: duration, 
                                easing: options.easing,                                
                                scale: 1,
                                rotate: 0,
                                opacity: 1,
                                complete: () => {
                                    this.lock(false)
                                    end()
                                }
                            })
                    })                                
                break  
                case 'flip':            
                    this.setOverlay(images[previousImage].src, () => {                       
                        this.setActiveCard()
                        anime.timeline()
                            .add({
                                targets: document.querySelector(`#${randomId} .__overlay`),
                                duration: 0, 
                                easing: 'linear',
                                opacity: 1,  
                                scaleY: 1,                    
                            })                    
                            .add({
                                targets: document.querySelector(`#${randomId} .__overlay`),
                                duration: duration, 
                                easing: options.easing,                                
                                scaleY: 0,
                                complete: () => {
                                    this.lock(false)
                                    end()
                                }
                            })
                    }) 
                  break 
                  case 'fold':            
                    this.setOverlay(images[previousImage].src, () => {                       
                        this.setActiveCard()
                        anime.timeline()
                            .add({
                                targets: document.querySelector(`#${randomId} .__overlay`),
                                duration: 0, 
                                easing: 'linear',
                                opacity: 1,  
                                scaleX: 1,                    
                            })                    
                            .add({
                                targets: document.querySelector(`#${randomId} .__overlay`),
                                duration: duration, 
                                easing: options.easing,                                
                                scaleX: 0,
                                complete: () => {
                                    this.lock(false)
                                    end()
                                }
                            })
                    })                                                    
                break    
                case 'unfold':            
                  this.setOverlay(images[currentImage].src, () => {                       
                      anime.timeline()
                          .add({
                              targets: document.querySelector(`#${randomId} .__overlay`),
                              duration: 0, 
                              easing: 'linear',
                              opacity: 1,  
                              scaleX: 0,                    
                          })                    
                          .add({
                              targets: document.querySelector(`#${randomId} .__overlay`),
                              duration: duration, 
                              easing: options.easing,                                
                              scaleX: 1,
                              complete: () => {
                                  this.setActiveCard()
                                  this.lock(false)
                                  end()
                              }
                          })
                  }) 
                break
                case 'unflip':            
                  this.setOverlay(images[currentImage].src, () => {                       
                      anime.timeline()
                          .add({
                              targets: document.querySelector(`#${randomId} .__overlay`),
                              duration: 0, 
                              easing: 'linear',
                              opacity: 1,  
                              scaleY: 0,                    
                          })                    
                          .add({
                              targets: document.querySelector(`#${randomId} .__overlay`),
                              duration: duration, 
                              easing: options.easing,                                
                              scaleY: 1,
                              complete: () => {
                                  this.setActiveCard()
                                  this.lock(false)
                                  end()
                              }
                          })
                  })                                                                    
                break                                                                                                                                          
            }
        }

        // vertical sliders
        if(this.determineType() === 'v'){

            switch(options.type){
                case 'cascade':
                    this.setUnderlay(images[currentImage].src, duration)
                    cards[this.determineType()].forEach((card, index) => {
                        anime({
                            targets: card,
                            duration, 
                            easing: options.easing,
                            translateY: reversed ? `-100%` : `100%`,
                            complete: () => {
                                if(index === 1){
                                    completed()
                                    end()
                                }
                            }                    
                        });
                    })
                break
                case 'waterfall':
                this.hideOverlay()
                    anime({
                        targets: document.querySelector(`#${randomId}  .__overlay`),
                        duration: 0, 
                        translateY: reversed ? `100%` : `-100%`,
                        delay: 200                        
                    })                       
                    this.setOverlay(images[currentImage].src, () => {                                    
                        anime({
                            targets: document.querySelector(`#${randomId}  .__overlay`),
                            easing: options.easing,
                            translateY: 0,
                            delay: 200,
                            complete: () => {
                                this.setActiveCard()
                                this.lock(false)
                                end()
                            }
                        })                                                
                    })
                break
            }
        }     
        
        
    }

    resetPosition(hide){
        let {cards} = this;
    
        cards[this.determineType()].forEach((card, index) => {
            anime({
                targets: card,
                duration: 1,
                translateX: 0,
                translateY: 0,
                opacity: hide ? 0 : 1,
            });
            if(index === 0 || index === 2){
                this.removeImageOnCard(index)
            }
        })        
    }
}
