import DarkMode from "./DarkMode.js";
import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";
import ImageInfo from "./ImageInfo.js";
import Banner from "./Banner.js";
import api from "./api.js";

console.log("app is running!");

export default class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;
    this.searchResultSection = $target.querySelector("ul");
    
    this.isDarkMode = new DarkMode({$target});
    
    this.searchInput = new SearchInput({
      $target,
      onSearch: async keyword => 
      {
        this.showMsg("now loading...");
        const res = await api.fetchCats(keyword);
        if (res.isError)
            this.showMsg(`Error occured. ${res.data}`);
        else
            this.setState(res.data);
      },
      onRandom: async _=> 
      {
        this.showMsg("now loading...");
        const res = await api.fetchRandomCats();
        if (res.isError)
            this.showMsg(`Error occured. ${res.data}`);
        else
            this.setState(res.data);
      }
    });

    this.banner = new Banner({
      $target,
      onRandom: async _=> 
      {
        const res = await api.fetchRandomCats();
        if (res.isError)
            this.showMsg(`Error occured. ${res.data}`);
        else
            this.banner.setState(res.data);
      }
    });

    this.data = JSON.parse(sessionStorage.getItem("searchResult"));

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: image => {
        this.imageInfo.setState({
          visible: true,
          image
        });
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
  
  showMsg(message)
  {
    this.searchResultSection.innerHTML = `<li style='grid-column:1/5;'>${message}</li>`;
  }
}
