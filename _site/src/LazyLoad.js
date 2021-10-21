export default function lazyLoad($target) {
    const images = Array.from($target.querySelectorAll("div"));
    
    if ("IntersectionObserver" in window) {
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
    
        images.forEach(image => io.observe(image));
    }
}