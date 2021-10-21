import lazyLoad from "./LazyLoad.js";

export default class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = $target.querySelector("ul");

    this.data = initialData;
    this.onClick = onClick;

    this.$searchResult.addEventListener("click", e => {
      this.$searchResult.querySelectorAll("div").forEach(($item, index) => {
        if ($item === e.target)
          this.onClick(this.data[index]);
      });    
    });

    this.$searchResult.addEventListener("mouseover", e => {
      this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
        if ($item.querySelector("div") === e.target)
          $item.querySelector("h5").textContent = `고양이 이름: ${this.data[index].name}`;
      });    
    });

    this.$searchResult.addEventListener("mouseout", e => {
      this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
        if ($item.querySelector("div") === e.target)
          $item.querySelector("h5").textContent = '';
      });    
    });

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    if (nextData !== undefined)
        sessionStorage.setItem("searchResult", JSON.stringify(nextData));
    this.render();
  }

  render() {
    if (this.data === null) return;
    this.$searchResult.innerHTML = this.data.length === 0 ? 
    "<li style='grid-column:1/5'>검색 결과가 없습니다. 다른 고양이 종명을 검색해보세요.</li>" : 
    this.data.map( cat => `
          <li class="item">
            <article>
              <div lazyload="${cat.url}">&nbsp;</div>
              <h5>&nbsp;</h5>
            </article>
          </li>
        `
      )
      .join("");
    lazyLoad(this.$searchResult);
  }
}

