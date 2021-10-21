export default function($target, onRandom)
{
    if ("IntersectionObserver" in window) {
        let io = new IntersectionObserver( entries =>
        {
            entries.forEach(entry => 
            {
                if (entry.isIntersecting) 
                {
                    onRandom();
                    io.unobserve(entry.target);
                }
            });
        });
        io.observe($target.lastElementChild);
    }
}