export default function lazyLoad($target, len) 
{    
    let io = new IntersectionObserver( entries =>{ 
        // 관찰 중이었던 어느 한 엘리먼트라도 화면 안으로 들어왔을 때 실행되는 콜백함수. 
        // 관찰 중인 모든 엘리먼트가 entries에 담겨 콜백함수 안으로 전달된다.
        entries.forEach(entry => {
            if (entry.isIntersecting) 
            {
                // entries에 현재 화면 안에 안 들어온 엘리먼트도 담겨 들어오기 때문에 이렇게 forEach, isIntersecting 쌍으로 화면에 들어온 엘리먼트를 찾아야 함.
                
                entry.target.style.backgroundImage = `url(${entry.target.getAttribute("lazyload")})`;
                io.unobserve(entry.target);
            }
        });
    });
    Array.from($target.querySelectorAll("div")).forEach( (elem, idx) => {
        if (idx >= dataLength)
            io.observe(elem)
    });
}
