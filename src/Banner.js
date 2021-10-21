import lazyLoad from "./LazyLoad.js";

export default class Banner 
{
    idx = 0;

    constructor({$target, onRandom})
    {
        this.randomCatsList = $target.querySelector(".RandomCatsList");
        this.randomCatsListWrapper = $target.querySelector(".RandomCatsList-wrapper");

        this.randomCatsListWrapper.addEventListener("click", e=>
        {
            if (e.target.classList.contains("RandomCatsListLeft"))
                this.idx--;
            else if (e.target.classList.contains("RandomCatsListRight"))
                this.idx++;
            if (this.idx < 0) this.idx = 0;
            if (this.idx > this.data.length-5) this.idx = this.data.length-5;
            this.randomCatsList.style.transform = `translateX(${-this.idx * 100}px)`;
        });

        onRandom();
    }

    setState(nextData) {
        this.data = nextData;
        this.render();
    }
    
    render()
    {
        this.randomCatsList.innerHTML = this.data.map( image =>
            {
                return `<li style='background-image:url(${image.url})'>`
            }).join("");
        lazyLoad(this.randomCatsList, 0);
    }
}