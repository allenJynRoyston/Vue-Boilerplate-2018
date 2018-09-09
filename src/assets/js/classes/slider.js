import anime from "animejs";

export class VJSlider {
    constructor(ele) {        
        this.ele = ele;     
        this.previousImage = 0   
        this.currentImage = 0        
        this.options = {
            padding: 0,
            speed: 700,
            type: 'waterfall',
            easing: 'easeInOutCubic'
        }

        this.images = [
            {src: 'https://picsum.photos/800/600?image=111', index: 0},
            {src: 'https://picsum.photos/800/600?image=222', index: 1},
            {src: 'https://picsum.photos/800/600?image=178', index: 2},            
            {src: 'https://picsum.photos/1200/600?image=444', index: 3},
        ]
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
    }


    buildLayout(){
        let {ele, buttons, inputElements, cards, images, options} = this;
        this.randomId = `__slider_${Math.random().toString(36).substring(7)}`;

        // build layout
        let horizontalSlide = '';
        for(var i = 0; i < 3; i++){
            horizontalSlide += `
            <div class='__hs' style='width: calc(33.333334% - ${options.padding*2}px); height: calc(100% - ${options.padding*2}px); float: left;padding: ${options.padding}px;'>
                <div style='width: 100%;height: 100%; display: flex; align-items: center; justify-content: center;color: white;'>
                    
                </div>
            </div>
            `
        }

        let verticalSlide = '';
        for(var i = 0; i < 3; i++){
            verticalSlide += `
        <div class='__vs' style='width: calc(100% - ${options.padding*2}px); height: calc(33.333334% - ${options.padding*2}px);padding: ${options.padding}px'>
            <div style='width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;color: white'>
            </div>
        </div>
        `     
        }   

        let dots = '';
        for(let i = 0; i < this.images.length; i++){
          dots +=  `<span class='vj-slider--dots-item __dot'>&middot;</span>`
        }

        let _layout = document.createElement('section');
        _layout.innerHTML =`
        <!-- container -->
        <div id='${this.randomId}' class='vj-slider' style='height: 400px; width: 100%; padding: ${options.padding}px; position: relative; overflow: hidden'>
            
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
                <div class='icon'>
                    <
                </div>
            </div>
            <div class='vj-slider--button-right __button '>
                <div class='icon'>
                    >
                </div>
            </div>     

            <!-- DOTS -->
            <div class='vj-slider--dots-container'>
                ${dots}
            </div>    
            
            <!-- IMAGE LOADER -->
            <img class='__imagepreloader' style='position: absolute; opacity: 0; top: 0; left: 0; z-index: -1; pointer-events: none'/>
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

        // get button and attach actions
        document.querySelectorAll(`#${this.randomId} .__button`).forEach((ele, index) => {
            inputElements.push(ele)
            ele.addEventListener('click', () => {
                if(!buttons.locked){
                    this.lock(true)
                    index === 1 ? this.next() : this.prev()
                }
            })
        })  
        
        // get button and attach actions
        document.querySelectorAll(`#${this.randomId} .__dot`).forEach((ele, index) => {
            inputElements.push(ele)
            ele.addEventListener('click', () => {
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
        let {options} = this
        let ele = document.querySelector(`.__underlay`);  

        // renders container (timer is to hide until ready)
        let _style = `position: absolute; top: 0; left: 0; width: 100%; height: 100%;`
        ele.setAttribute('style', `${_style}; opacity: 0`);
        setTimeout(() => {
            ele.setAttribute('style', `${_style}; opacity: 1`);
        }, duration - 1)

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
        let ele = document.querySelector(`.__underlay`);
        ele.innerHTML = `
            <div></div>
        `    
    }

    setOverlay(image, callback = () => {}){
        let {options} = this;
        let ele = document.querySelector(`.__overlay`);  
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
        let ele = document.querySelector(`.__overlay`);
        ele.innerHTML = `
            <div></div>
        `   
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
        let {buttons, inputElements} = this
        inputElements.forEach(ele => {
            ele.setAttribute('style', `opacity: ${state ? 0.5 : 1} `)
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
        let {images, currentImage, previousImage, cards, options} = this;
        let duration = options.speed;
        this.markActiveDot();
        
        const completed = () => {            
            setTimeout(() => {            
                this.resetPosition(true)
            }, 1)
            setTimeout(() => {
                this.setActiveCard()
                this.resetPosition(false)
            }, 25)
            setTimeout(() => {            
                this.hideUnderlay()
                this.lock(false)
                callback()
            }, 125)               
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
                                    completed()
                                }
                            }
                        });
                    })
                break
                case 'slip':
                    this.hideOverlay()
                    anime({
                        targets: document.querySelector(`.__overlay`),
                        duration: 0, 
                        translateX: reversed ? `-100%` : `100%`,
                        delay: 200                        
                    })                       
                    this.setOverlay(images[currentImage].src, () => {                                    
                        anime({
                            targets: document.querySelector(`.__overlay`),
                            easing: options.easing,
                            translateX: 0,
                            delay: 200,
                            complete: () => {
                                this.setActiveCard()
                                this.lock(false)
                            }
                        })                                                
                    })
                break                
                case 'fade':                        
                    this.setOverlay(images[previousImage].src, () => {                       
                        this.setActiveCard()
                        anime.timeline()
                            .add({
                                targets: document.querySelector(`.__overlay`),
                                duration: 0, 
                                easing: 'linear',
                                opacity: 1,                                
                            })                    
                            .add({
                                targets: document.querySelector(`.__overlay`),
                                duration: duration, 
                                easing: 'linear',
                                opacity: 0,
                                complete: () => {
                                    this.lock(false)
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
                                }
                            }                    
                        });
                    })
                break
                case 'waterfall':
                this.hideOverlay()
                    anime({
                        targets: document.querySelector(`.__overlay`),
                        duration: 0, 
                        translateY: reversed ? `100%` : `-100%`,
                        delay: 200                        
                    })                       
                    this.setOverlay(images[currentImage].src, () => {                                    
                        anime({
                            targets: document.querySelector(`.__overlay`),
                            easing: options.easing,
                            translateY: 0,
                            delay: 200,
                            complete: () => {
                                this.setActiveCard()
                                this.lock(false)
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
