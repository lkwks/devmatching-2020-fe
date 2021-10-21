export default class 
{
    isVisible = false;
    
    constructor($target)
    {
        this.$messageWindow = $target.querySelector(".MessageWindow");
        this.titleNode = this.$messageWindow.querySelector(".title");
        this.messageNode = this.$messageWindow.querySelector(".message");
        this.render();
    }

    setState({title, message, isVisible, onClick})
    {
        this.title = title;
        this.isVisible = isVisible;
        this.message = message;
        this.onClick = onClick;
        this.render();
    }

    fadeIn() 
    {
        this.$messageWindow.classList.add("FadeIn");
        this.$messageWindow.classList.remove("FadeOut");
    }
    
    fadeOut() 
    {
        this.$messageWindow.classList.add("FadeOut");
        this.$messageWindow.classList.remove("FadeIn");
    }
    
    
    render()
    {
        if(this.isVisible)
        {
            this.titleNode.innerHTML = this.title;
            this.messageNode.innerHTML = this.message;
            if (this.title)
                this.$messageWindow.addEventListener("click", async e=>
                {
                    if (e.target.nodeName === "B")
                    {
                        await this.onClick();
                        this.fadeOut();
                    }
                });
            this.fadeIn();
        }
        else
            this.fadeOut();
    }
}
