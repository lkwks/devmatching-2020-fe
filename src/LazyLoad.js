export default function lazyLoad($target, dataLength) 
{    
    if ("IntersectionObserver" in window) 
    {
        let io = new IntersectionObserver( entries =>
        {
            entries.forEach(entry => 
            {
                if (entry.isIntersecting) 
                {
                    entry.target.style.backgroundImage = `url(${entry.target.getAttribute("lazyload")})`;
                    io.unobserve(entry.target);
                }
            });
        });
        Array.from($target.querySelectorAll("div")).forEach( (elem, idx) => 
        {
            if (idx >= dataLength)
                io.observe(elem)
        });
    }
}