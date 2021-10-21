import lazyLoad from "./LazyLoad.js";
import infiniteScroll from "./InfiniteScroll.js";

export default class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;
  dataLength = 0;
  isScroll = false;
  isRandom = false;

  constructor({ $target, initialData, onClick, onRandom }) {
    this.$searchResult = $target.querySelector(".SearchResult");

    this.data = initialData;
    this.addedData = this.data;
    this.onClick = onClick;
    this.onRandom = onRandom;

    this.$searchResult.addEventListener("click", e => {
      if (e.target.nodeName === "DIV")
        this.onClick(this.data[e.target.getAttribute("idx")]);
    });

    this.$searchResult.addEventListener("mouseover", e => {
      if (e.target.nodeName === "DIV")
        e.target.parentNode.querySelector("h5").textContent = `고양이 이름: ${this.data[e.target.getAttribute("idx")].name}`;
    });

    this.$searchResult.addEventListener("mouseout", e => {
      if (e.target.nodeName === "DIV")
        e.target.parentNode.querySelector("h5").textContent = ``;
    });

    this.render();
  }

  setState(nextData, isRandom, isScroll) {
    if (isRandom && isScroll)
    {
      this.dataLength += this.addedData.length;
      nextData.forEach(elem => this.data.push(elem));
    }
    else
    {
      this.dataLength = 0;
      this.data = nextData;
    }
    this.isRandom = isRandom;
    this.isScroll = isScroll;
    this.addedData = nextData;
    if (nextData !== undefined && nextData.length > 0)
        sessionStorage.setItem("searchResult", JSON.stringify(nextData));
    this.render();
  }

  render() {
    if (this.data === null || this.data === undefined) return;
    if (this.data.length === 0)
      this.$searchResult.innerHTML = "<li style='grid-column:1/5'>검색 결과가 없습니다. 다른 고양이 종명을 검색해보세요.</li>";
    else
    {
      this.$searchResult.innerHTML = this.isScroll && this.$searchResult.firstChild.textContent !== 'now loading...'?this.$searchResult.innerHTML : "";
      
      this.$searchResult.innerHTML += this.addedData.map((cat, idx) =>
        `
        <li class="item">
          <article>
            <div lazyload="${cat.url}" idx=${this.dataLength + idx}>&nbsp;</div>
            <h5>&nbsp;</h5>
          </article>
        </li>
      `).join("");
      lazyLoad(this.$searchResult, this.dataLength);
      if (this.isRandom) infiniteScroll(this.$searchResult, this.onRandom);
    }
  }
}

