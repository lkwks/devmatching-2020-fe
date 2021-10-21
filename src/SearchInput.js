const TEMPLATE = '<input type="text">';

export default class SearchInput {
    
  constructor({ $target, onSearch, onRandom }) {
    this.$searchInput = $target.querySelector(".SearchInput");
    this.latestQueriesBox = new LatestQueriesBox($target.querySelector("#LatestQueries"));
    
    this.$searchInput.addEventListener("keyup", e => {
      if (e.keyCode === 13)
      {
        onSearch(e.target.value);
        this.latestQueriesBox.setState(e.target.value);
      }
    });
    
    this.$searchInput.addEventListener("click", _=> { this.$searchInput.value = ''; } );
    
    $target.addEventListener("click", e=>
    {
        if (e.target.nodeName === "BUTTON")
        {
          if (e.target.classList.contains("RandomCatsButton"))
            onRandom();
          else if(e.target.classList.contains("LatestQuery"))
          {
            onSearch(e.target.textContent);
            this.latestQueriesBox.setState(e.target.textContent);
            this.$searchInput.value = e.target.textContent;
          }
        }
    });

    console.log("SearchInput created.", this);
  }
  
  render() {}  
}



class LatestQueriesBox
{
  latestQueries = [];

  constructor($target)
  {
    this.$target = $target;
  }

  setState(newQuery)
  {
    const newQueryNode = document.createElement("button");
    newQueryNode.classList.add("LatestQuery");
    newQueryNode.textContent = newQuery;
    if (this.latestQueries.length == 5) this.latestQueries.pop();
    this.latestQueries.unshift(newQueryNode);
    this.render();
  }

  render()
  {
    this.$target.innerHTML = this.latestQueries.map(elem => elem.outerHTML).join(" ");
  }
}
